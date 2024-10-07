from typing import List, Dict
import requests
from requests import Response
import json
import logging
from utils.get_pars_config.get_kufar_pars_config import get_kufar_pars_config


def get_kufar_data(query: str) -> List[Dict]:

    kufar_pars_config: Dict = get_kufar_pars_config()

    query: str = query.strip()
    url: str = kufar_pars_config['main_pars_url'].format(query=query)
    first_part_image_part: str = 'https://rms.kufar.by/v1/list_thumbs_2x/'

    data: Response = requests.get(url)
    data: Dict = json.loads(data.text)

    result_list: List[Dict[str, ...]] = []

    for i in data['ads']:
        if i['images']:
            try:
                item: Dict[str, ...] = \
                    {'link': i['ad_link'],
                     'name': i['subject'],
                     'image': first_part_image_part + i['images'][0]['path'],
                     'price': int(i['price_byn']) / 100}
                result_list.append(item)

            except KeyError:
                item: Dict[str, ...] = \
                    {'link': i['ad_link'],
                     'name': i['subject'],
                     'image': first_part_image_part + i['images'][1]['path'],
                     'price': int(i['price_byn']) / 100}
                result_list.append(item)

            except Exception as e:
                logging.error(e)

        else:
            item: Dict[str, ...] = \
                {'link': i['ad_link'],
                 'name': i['subject'],
                 'price': int(i['price_byn']) / 100}

            result_list.append(item)

    return result_list
