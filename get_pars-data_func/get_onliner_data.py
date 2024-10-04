from typing import List, Dict
import requests
from requests import Response
import json


def get_onliner_data(query: str, page: int = 1) -> List[Dict]:
    query: str = query.strip().replace(' ', '+')
    url: str = f'https://catalog.onliner.by/sdapi/catalog.api/search/products?query={query}&page={page}'

    data: Response = requests.get(url)
    data: Dict = json.loads(data.text)

    result_list: List[Dict[str | float], ...] = []

    for i in data['products']:
        if i['prices']:
            item: Dict[str | float, ...] = {'link': i['html_url'],
                                            'name': i['full_name'],
                                            'image': i['images']['header'],
                                            'description': i['description'],
                                            'price': float(i['prices']['price_min']['amount'])}
        else:
            item: Dict[str | float, ...] = {'link': i['html_url'],
                                            'name': i['full_name'],
                                            'image': i['images']['header'],
                                            'description': i['description'],
                                            'price': 0.0}
        result_list.append(item)

    return result_list


res = get_onliner_data('cmf phone 1', 1)
for c in res:
    print(c)
