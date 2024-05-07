from scrapy.exporters import JsonLinesItemExporter
from pocketbase.utils import ClientResponseError
from db.db_utils import (
    login,
    create_collection,
    insert_item,
    update_item,
    exist 
)


class MultiExportPipeline:

    def open_spider(self, spider):
        self.makes_models_exporter = JsonLinesItemExporter(
            open('makes_models.jsonl', 'wb'),
            ensure_ascii=False,
            indent=4
        )
        self.cars_exporter = JsonLinesItemExporter(
            open('cars.jsonl', 'wb'),
            ensure_ascii=False,
            indent=4
        )
        self.client = login(
            '', # username 
            '' # password
        )
        collection_name = 'makes_models' if spider.makes_models else 'cars'
        try :
            create_collection(self.client,collection_name,spider.makes_models)
        except ClientResponseError as e:
            pass
        self.collection = self.client.collection(collection_name)

    def close_spider(self, spider):
        self.makes_models_exporter.finish_exporting()
        self.cars_exporter.finish_exporting()


    def process_item(self, item, spider):
        if item['kind'] == 'makes_models':
            self.makes_models_exporter.export_item(item)
            if not exist(self.client,self.collection,item):
                insert_item(self.client,self.collection,item)
            else :
                update_item(self.client,self.collection,item)
        else :
            self.cars_exporter.export_item(item)
            if not exist(self.client,self.collection,item):
                insert_item(self.client,self.collection,item)
            else :
                update_item(self.client,self.collection,item)
        return item