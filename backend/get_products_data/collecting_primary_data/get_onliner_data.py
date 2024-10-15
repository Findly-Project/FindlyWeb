import logging
from typing import Dict
import httpx
from httpx import Response
import json
from backend.utils.get_pars_config.get_pars_config import GetParsConfig
from .product_models import ProductData, ProductList


async def get_onliner_data(query: str) -> ProductList:
    onliner_pars_data: Dict[str] = GetParsConfig.get_onliner_pars_config()
    product_list: ProductList = ProductList()
    query: str = query.strip().replace(' ', '+')

    for page in range(1, 5):
        url: str = onliner_pars_data['main_api_url'].format(query=query, page=page)

        async with httpx.AsyncClient() as client:
            data: Response = await client.get(url)

        data: Dict = json.loads(data.text)

        for i in data['products']:
            try:
                if i['prices']:
                    item: ProductData = ProductData(
                        link=i['html_url'],
                        name=i['full_name'],
                        image=i['images']['header'],
                        price=float(i['prices']['price_min']['amount'])
                    )
                    product_list.add_product(item)

            except Exception as e:
                logging.error(e)

    return product_list
