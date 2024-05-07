import scrapy 
import sys 
from scrapy.spiders import CrawlSpider
from scrapy.crawler import CrawlerProcess 
from scrapy import Request 
from urllib.parse import quote
from scrapy.shell import inspect_response
from pathlib import Path 
from utils.utils import (
    extract_makes,
    extract_models,
    get_total_pages,
    get_cars_urls,
    get_primary_detail,
    get_car_additional_details,
    update_xpath_fields,
    get_uk_list_space,
    get_vehicle_detail_equipement_detail,
    check_count
)


class InfosSpider(scrapy.Spider):
    name = 'extractor'  
    model_make_template = 'https://www.bytbil.com/bil?Makes={make}&Models={model}'

    def __init__(self,makes_models:str=None):
        self.makes_models = makes_models

    def start_requests(self):
        yield Request(
            'https://www.bytbil.com/',
            callback=self.parse_makes,
        )

    def parse_makes(self,response):
        makes = extract_makes(response)
        yield from [
            Request(
                f'https://www.bytbil.com/api/car/models/?makesString={quote(make)}',
                callback=self.parse_models,
                meta = {
                    'make':make,
                }
            )
            for make in makes
        ]

    def parse_models(self,response):
        models = extract_models(response)
        if models :
            yield from [
                Request(
                    self.model_make_template.format(
                        make=response.meta['make'],
                        model=model
                    ),
                    callback=self.parse_model_make_total_pages,
                    meta = {
                        'make':response.meta['make'],
                        'model':model
                    }
                )
                for model in models
            ]
        else :
            if not check_count(response.meta['make']):
                if not self.makes_models :
                    return 
                yield {
                    'make':response.meta['make'],
                    'kind':'makes_models' 
                }
            else :
                yield Request(
                    f'https://www.bytbil.com/bil?Makes={quote(response.meta["make"])}',
                    callback=self.parse_model_make_listing,
                    meta={
                        **response.meta,
                        'model':''
                    }
                ) 

    def parse_model_make_total_pages(self,response):
        try : 
            cars_urls = get_cars_urls(response) 
            cars_urls[0]
        except IndexError :
            if not self.makes_models :
                return 
            yield {
                'make':response.meta['make'],
                'model':response.meta['model'],
                'kind':'makes_models'
            }
            return 
        if self.makes_models:
            yield Request(
                cars_urls[0],
                callback=self.parse_make_model_item,
                meta=response.meta 
            )
        else : 
            total_pages = get_total_pages(response)
            yield from [
                Request(
                    self.model_make_template.format(
                        make=quote(response.meta['make']),
                        model=quote(response.meta['model'])
                    ) + f'&Page={page}',
                    dont_filter=True,
                    callback=self.parse_model_make_listing,
                    meta=response.meta
                )
                for page in range(1,total_pages+1)
            ]

    def parse_model_make_listing(self,response):
        cars_urls = get_cars_urls(response)
        yield from [
            Request(
                car_url,
                callback=self.parse_car if not self.makes_models \
                    else self.parse_make_model_item,
                meta=response.meta
            )
            for car_url in cars_urls
        ]

    def parse_car(self,response):
        car_item = {}
        car_item['kind'] = 'cars'
        car_item['url'] = response.url 
        car_item['make'] = response.meta['make']
        car_item['model'] = response.meta['model'] if response.meta['model'] \
            else response.xpath(
                '//dt[contains(text(),"Modell")]/following-sibling::dd//text()'
            ).get()
        car_item = update_xpath_fields(car_item,response)
        car_item = get_primary_detail(car_item,response)
        car_item = get_car_additional_details(car_item,response)
        car_item = get_uk_list_space(car_item,response)
        car_item = get_vehicle_detail_equipement_detail(car_item,response)
        yield car_item

    def parse_make_model_item(self,response):
        model_make_item = {}
        model_make_item['kind'] = 'makes_models'
        model_make_item['make'] = response.meta['make']
        model_make_item['model'] = response.meta['model']
        model_make_item = update_xpath_fields(model_make_item,response)
        model_make_item = get_car_additional_details(model_make_item,response)
        model_make_item = get_uk_list_space(model_make_item,response)
        model_make_item = get_vehicle_detail_equipement_detail(model_make_item,response)
        yield model_make_item 


if __name__ == '__main__':  
    process = CrawlerProcess(
        {
            # 'FEED_URI':'output.json',
            # 'FEED_FORMAT':'json',
            # 'CONCURENT_REQUESTS':1,
            # 'DOWNLOAD_DELAY':5,
            # 'HTTPCACHE_ENABLED' : True,
            # 'HTTPERROR_ALLOWED_CODES':[403],

            'PROXY_FILE' : Path(__file__).parent.joinpath("proxies.txt").__str__(),
            "DOWNLOAD_HANDLERS": {
                'http': 'utils.s5downloader.Socks5DownloadHandler',
                'https': 'utils.s5downloader.Socks5DownloadHandler',
            },

            'ITEM_PIPELINES': {
                'utils.pipeline.MultiExportPipeline': 100
            },
            # "LOG_LEVEL":'ERROR'
        }
    )

    process.crawl(InfosSpider,makes_models=sys.argv[1] == 'makes_models')
    process.start()