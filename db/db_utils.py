from pocketbase import PocketBase
from typing import List 
from pocketbase.services.record_service import RecordService
from pocketbase.utils import ClientResponseError
from re import search 

# global vars & initialization :
config = (
    ('url','text'),
    ('make','text'),
    ('model','text'),
    ('title','text'),
    ('car_price_details','text'),
    ('price_excluding_vat','text'),
    ('vehicle_detail_additional_detail','json'),
    ('uk_list_space_equipement_detail','text'),
    ('vehicle_detail_equipment_detail',"text"),
)


# helper functions : 
def login(user:str, passwd:str) -> PocketBase:
    client = PocketBase('http://127.0.0.1:8090')
    admin_data = client.admins.auth_with_password(user, passwd)
    return client 


def get_schema_object(name:str,type:str='text') -> dict :
    return {
        'id': '',
        'name': name,
        'type': type,
        'system': False,
        'required': False,
        'options': {} if not type=='json' else {"maxSize":2000000},
        'onMountSelect': False,
        'originalName': 'field',
        'toDelete': False
    }


def get_schema_list(makes_models:bool) -> List[dict]:
    return [
        get_schema_object(*schema_obj)
        for schema_obj in (config if not makes_models else config[1:])
    ]


def get_collection_body(collection_name:str,makes_models:bool) -> dict : 
    return {
        'id': '',
        'created': '',
        'updated': '',
        'name': collection_name,
        'type': 'base',
        'system': False,
        'listRule': None,
        'viewRule': None,
        'createRule': None,
        'updateRule': None,
        'deleteRule': None,
        'schema': get_schema_list(makes_models),
        'indexes': [],
        'options': {},
        'originalName': ''
    }


def create_collection(client:PocketBase, collection_name:str,makes_models:bool):
    return client.collections.create(
        get_collection_body(collection_name,makes_models)
    )


def insert_item(client:PocketBase,collection:RecordService,item:dict):
    collection.create(item)


def update_item(client:PocketBase,collection:RecordService,item:dict):
    collection.update(
        get_id(client,collection,item),
        item
    )


def exist(client:PocketBase,collection:RecordService,item:dict):
    if item['kind'] == 'makes_models':
        return bool(
                collection.get_list(1,2,{
                    'filter':f'make = "{item["make"]}" && model = "{item["model"]}"'
                }
            ).items
        )
    else :
        try:
            return bool(
                    collection.get_list(1,2,{
                        'filter':f'url~"{get_url_id(item["url"])}"'
                    } 
                ).items
            )
        except (AttributeError,ClientResponseError) as error:
            breakpoint()
    

def get_url_id(url:str):
    return search('\d+$',url)[0]


def get_id(client:PocketBase,collection:RecordService,item:dict):
    if item['kind'] == 'makes_models':
        return collection.get_list(1,2,{
                        'filter':f'make = "{item["make"]}" && model = "{item["model"]}"'
                    }
                ).items[0].id
    else :
        return collection.get_list(1,2,{
                        'filter':f'url~"{get_url_id(item["url"])}"'
                    } 
                ).items[0].id

