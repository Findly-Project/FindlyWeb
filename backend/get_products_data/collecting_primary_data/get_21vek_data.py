from typing import Dict
import httpx
from httpx import Response
from bs4 import BeautifulSoup
from bs4.element import ResultSet
import re
import logging
from backend.utils.get_pars_config.get_pars_config import GetParsConfig
from .product_models import ProductData, ProductList


async def get_21vek_data(query: str) -> ProductList:
    _21vek_pars_config: Dict[str] = GetParsConfig.get_21vek_pars_config()

    query: str = query.strip()
    url: str = _21vek_pars_config['main_api_url'].format(query=query)

    async with httpx.AsyncClient() as client:
        data: Response = await client.get(url)

    soup: BeautifulSoup = BeautifulSoup(data.text, 'html.parser')
    data: ResultSet = soup.find_all('li', class_='g-box_lseparator')

    product_list: ProductList = ProductList()

    for i in data:
        try:
            price: str = i.find('span', class_='j-item-data').text
            price: float = float(re.sub(r' ', '', re.sub(r',', '.', price.rstrip('0'))))

            item: ProductData = ProductData(
                link=i.find('a', class_='j-ga_track')['href'],
                name=i.find('span', class_='result__name').text,
                image=i.find('span', class_='result__img__inner').img['src'],
                price=price
            )
        except (TypeError, AttributeError):
            continue
        except Exception as e:
            logging.error(e)
        else:
            product_list.add_product(item)

    return product_list
