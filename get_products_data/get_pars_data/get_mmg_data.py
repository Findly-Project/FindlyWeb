from typing import List, Dict
import requests
from requests import Response
from bs4 import BeautifulSoup
import logging
from utils.get_pars_config.get_mmg_pars_config import get_mmg_pars_config
import re


def get_mmg_data(query: str) -> List[Dict]:

    _mmg_pars_config: Dict[str, ...] = get_mmg_pars_config()

    query: str = query.strip().replace(' ', '+')
    first_part_url = 'https://mmg.by'
    url: str = _mmg_pars_config['main_pars_url'].format(query=query)

    data: Response = requests.get(url)
    soup: BeautifulSoup = BeautifulSoup(data.text, 'html.parser')
    data_soup: List = soup.find_all('div', class_='item')
    result_list: List[Dict[str, ...]] = []
    for i in data_soup:
        try:
            price = i.find('span', class_='price').text
            price = float(re.sub(r'[^\d.]', '', price).rstrip('.'))

            item: Dict[str, ...]
            item = {'link': first_part_url + i.find('a', class_='title')['href'],
                    'name': i.find('a', class_='title').text,
                    'image': first_part_url + i.find('div', class_='listener').img['src'],
                    'price': price}
        except (TypeError, AttributeError) as e:
            logging.error(e)
            continue
        except Exception as e:
            logging.error(e)
        else:
            result_list.append(item)

    return result_list

data = get_mmg_data('iphone 15')
for x in data:
    print(x)
