from typing import List
from ..collecting_primary_data.product_models import ProductList, ProductData


def filter_by_price(candidates: List[ProductData] | ProductList) -> ProductList:

    if len(candidates) > 2:
        while True:
            is_filter = 1
            for i in range(len(candidates) - 1):
                try:
                    if candidates[i + 1].price / candidates[i].price > 2:
                        candidates.del_product(i)
                        is_filter = 0
                except IndexError:
                    continue

            if is_filter:
                return candidates
    else:
        return candidates
