from backend.get_products_data.collecting_primary_data.get_kufar_data import get_kufar_data
from backend.get_products_data.collecting_primary_data.get_mmg_data import get_mmg_data
from backend.get_products_data.collecting_primary_data.get_onliner_data import get_onliner_data
from backend.get_products_data.collecting_primary_data.get_21vek_data import get_21vek_data
from typing import Dict, List, Tuple
from collecting_primary_data.product_models import ProductData, ProductList
from backend.get_products_data.filtering_algorithms import filter_regular_expression, filter_for_category_based_on_price


def output_of_results(query: str) -> Dict:
    get_data_functions: Dict = {'Kufar': get_kufar_data,
                                'MMG': get_mmg_data,
                                '21vek': get_21vek_data,
                                'Onliner': get_onliner_data}
    result_dict: Dict[Tuple[Dict[str]]]

    for func_name, func in get_data_functions.items():
        pars_data: ProductList = func(query)
        product_names: List[str] = [j['name'] for j in pars_data]

        regular_expression_filter: List[str] = filter_regular_expression.regular_expression(query, product_names)
        best_items: List[Dict[str]] = list(filter(lambda m: m['name'] in regular_expression_filter, pars_data))
        best_items.sort(key=lambda c: c['price'])

        result_data: List[Dict] = filter_for_category_based_on_price.filter_by_price(best_items)

        if result_data:
            result_dict[func_name]: Tuple[Dict[str]] = tuple(result_data)

    return result_dict
