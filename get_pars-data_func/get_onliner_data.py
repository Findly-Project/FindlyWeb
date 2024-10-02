from typing import List, Tuple, Dict
import requests
from requests import Response
import json


def get_onliner_data(query: str) -> Tuple[Tuple[str]]:
    query: str = query.strip().replace(' ', '+')
    url: str = f'https://catalog.onliner.by/sdapi/catalog.api/search/products?query={query}'

    data: Response = requests.get(url)
    data: Dict = json.loads(data.text)

    result_list: List[Tuple[str], ...] = []

    for i in data['products']:
        item: Tuple[str, ...] = (i['html_url'],
                                 i['full_name'],
                                 i['description'],
                                 i['prices']['price_min']['amount'])

        result_list.append(item)

    return tuple(result_list)


res = get_onliner_data('принтер')
for c in res:
    print(c)
