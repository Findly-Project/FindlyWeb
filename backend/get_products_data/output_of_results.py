from .collecting_primary_data.get_kufar_data import get_kufar_data
from .collecting_primary_data.get_mmg_data import get_mmg_data
from .collecting_primary_data.get_onliner_data import get_onliner_data
from .collecting_primary_data.get_21vek_data import get_21vek_data
from .collecting_primary_data.product_models import ProductList, ProductData, MarketPlaceList, SortProductList
from backend.get_products_data.filtering_algorithms import filter_regular_expression, filter_for_category_based_on_price
from typing import Dict, List


def output_of_results(query: str) -> MarketPlaceList:
    get_data_functions: Dict = {'Kufar': get_kufar_data,
                                'MMG': get_mmg_data,
                                '21vek': get_21vek_data,
                                'Onliner': get_onliner_data}
    result_dict: MarketPlaceList = MarketPlaceList()

    for func_name, func in get_data_functions.items():
        pars_data: ProductList = func(query)
        product_names: List[str] = [j.name for j in pars_data]

        regular_expression_filter: List[str] = filter_regular_expression.regular_expression(query, product_names)
        best_items: ProductList = SortProductList.sort_by_name(regular_expression_filter, pars_data)
        best_items_sorted_by_price: ProductList = SortProductList.sort_by_price(best_items)

        result_data: ProductList = filter_for_category_based_on_price.filter_by_price(best_items_sorted_by_price)

        if result_data:
            result_dict.add_list_of_products(func_name, result_data)

    return result_dict
