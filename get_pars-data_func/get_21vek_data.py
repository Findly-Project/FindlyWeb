from typing import List, Dict
import requests
from requests import Response
from bs4 import BeautifulSoup
import re


def get_21vek_data(query: str) -> List[Dict]:
    query: str = query.strip()
    url: str = f'https://www.21vek.by/search/?sa=&term={query}'

    data: Response = requests.get(url)
    soup: BeautifulSoup = BeautifulSoup(data.text, 'html.parser')
    data: List = soup.find_all('li', class_='g-box_lseparator')
    result_list: List[Dict[str | float], ...] = []
    for i in data:
        try:
            price = i.find('span', class_='j-item-data').text
            price = float(re.sub(r'[, ]', '', price.rstrip('0')))

            item: Dict[str | float, ...]
            item = {'link': i.find('a', class_='j-ga_track')['href'],
                    'name': i.find('span', class_='result__name').text,
                    'image': i.find('span', class_='result__img__inner').img['src'],
                    'price': price}
        except (TypeError, AttributeError) as e:
            continue

        result_list.append(item)

    return result_list


res = get_21vek_data('samsung s24')
for c in res:
    print(c)
