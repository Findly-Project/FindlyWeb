from typing import List, Dict
import requests
from requests import Response
from bs4 import BeautifulSoup
import re
import logging
from utils.get_pars_config.get_21vek_pars_config import get_21vek_pars_config


def get_21vek_data(query: str) -> List[Dict[str, ...]]:

    _21vek_pars_config: Dict[str, ...] = get_21vek_pars_config()

    query: str = query.strip()
    url: str = _21vek_pars_config['main_api_url'].format(query=query)

    data: Response = requests.get(url)
    soup: BeautifulSoup = BeautifulSoup(data.text, 'html.parser')
    data: List = soup.find_all('li', class_='g-box_lseparator')
    result_list: List[Dict[str, ...]] = []
    for i in data:
        try:
            price = i.find('span', class_='j-item-data').text
            price = float(re.sub(r' ', '', re.sub(r',', '.', price.rstrip('0'))))

            item: Dict[str, ...]
            item = {'link': i.find('a', class_='j-ga_track')['href'],
                    'name': i.find('span', class_='result__name').text,
                    'image': i.find('span', class_='result__img__inner').img['src'],
                    'price': price}
        except (TypeError, AttributeError) as e:
            continue
        except Exception as e:
            logging.error(e)
        else:
            result_list.append(item)

    return result_list
