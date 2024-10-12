import logging
from typing import List, Dict
import requests
from requests import Response
import json
from backend.utils.get_pars_config.get_onliner_pars_config import get_onliner_pars_config


def get_onliner_data(query: str, page: int = 1) -> List[Dict]:

    onliner_pars_data: Dict[str, ...] = get_onliner_pars_config()

    query: str = query.strip().replace(' ', '+')
    url: str = onliner_pars_data['main_api_url'].format(query=query, page=page)

    data: Response = requests.get(url)
    data: Dict = json.loads(data.text)

    result_list: List[Dict[str, ...]] = []

    for i in data['products']:
        try:
            if i['prices']:
                item: Dict[str, ...] = \
                    {'link': i['html_url'],
                     'name': i['full_name'],
                     'image': i['images']['header'],
                     'price': float(i['prices']['price_min']['amount'])}

                result_list.append(item)

        except Exception as e:
            logging.error(e)

    return result_list
