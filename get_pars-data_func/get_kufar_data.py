from typing import List, Dict
import requests
from requests import Response
import json


def get_kufar_data(query: str) -> List[Dict]:
    query: str = query.strip()
    url: str = f'https://api.kufar.by/search-api/v2/search/rendered-paginated?cnd=2&lang=ru&ot=1&query={query}&search_variant=constant_score&size=43&sort=scr.d'
    first_part_image_part = 'https://rms.kufar.by/v1/list_thumbs_2x/'

    data: Response = requests.get(url)
    data: Dict = json.loads(data.text)

    result_list: List[Dict[str | float], ...] = []

    for i in data['ads']:
        if i['images']:
            item: Dict[str | float, ...] = {'link': i['ad_link'],
                                            'name': i['subject'],
                                            'image': first_part_image_part + i['images'][0]['path'],
                                            'price': int(i['price_byn']) / 100}
        else:
            item: Dict[str | float, ...] = {'link': i['ad_link'],
                                            'name': i['subject'],
                                            'price': int(i['price_byn']) / 100}

        result_list.append(item)

    return result_list


res = get_kufar_data('iphone 16')
for c in res:
    print(c)
