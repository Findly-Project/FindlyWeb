from typing import Dict, Any
import httpx
from httpx import Response
import json
import logging
from backend.utils.get_pars_config.get_pars_config import GetParsConfig
from .product_models import ProductData, ProductList


async def get_kufar_data(query: str) -> ProductList:
    kufar_pars_config: Dict[str] = GetParsConfig.get_kufar_pars_config()

    query: str = query.strip()
    url: str = kufar_pars_config['main_pars_url'].format(query=query)
    first_part_image_url: str = kufar_pars_config['first_part_image_url']

    async with httpx.AsyncClient() as client:
        data: Response = await client.get(url)

    data: Dict[Any] = json.loads(data.text)
    product_list: ProductList = ProductList()

    for i in data['ads']:
        if i['images']:
            try:
                item: ProductData = ProductData(
                    link=i['ad_link'],
                    name=i['subject'],
                    image=first_part_image_url + i['images'][0]['path'],
                    price=int(i['price_byn']) / 100
                )
                if int(i['price_byn']):
                    product_list.add_product(item)

            except KeyError:
                item: ProductData = ProductData(
                    link=i['ad_link'],
                    name=i['subject'],
                    image=first_part_image_url + i['images'][1]['path'],
                    price=int(i['price_byn']) / 100
                )
                if int(i['price_byn']):
                    product_list.add_product(item)

            except Exception as e:
                logging.error(e)

        else:
            item: ProductData = ProductData(
                link=i['ad_link'],
                name=i['subject'],
                price=int(i['price_byn']) / 100
            )
            if int(i['price_byn']):
                product_list.add_product(item)

    return product_list
