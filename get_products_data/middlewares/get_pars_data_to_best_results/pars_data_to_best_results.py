from get_products_data.get_pars_data.get_kufar_data import get_kufar_data
from get_products_data.get_pars_data.get_mmg_data import get_mmg_data
from get_products_data.get_pars_data.get_onliner_data import get_onliner_data
from get_products_data.get_pars_data.get_21vek_data import get_21vek_data
from typing import Dict, List, Tuple
from get_products_data.middlewares.finding_best_result import regular_expression
from get_products_data.middlewares.finding_best_result import filter_for_category_based_on_price
from pprint import pprint


def pars_data_to_best_result(query: str) -> Dict:
    get_data_functions: Dict = {'Kufar': get_kufar_data,
                                'MMG': get_mmg_data,
                                '21vek': get_21vek_data,
                                'Onliner': get_onliner_data}
    result_dict: Dict[Tuple[Dict[str, ...]]] = {}

    for func_name, func in get_data_functions.items():
        print(f'now get {func_name}')
        pars_data: List[Dict[str, ...]] = func(query)
        product_names: List[str, ...] = [j['name'] for j in pars_data]

        regular_expression_filter: List[str, ...] = regular_expression.regular_expression(query, product_names)
        best_items: List[Dict[str, ...]] = list(filter(lambda m: m['name'] in regular_expression_filter, pars_data))
        best_items.sort(key=lambda c: c['price'])

        result_data = filter_for_category_based_on_price.filter_by_price(best_items)

        if result_data:
            result_dict[func_name]: Tuple[Dict[str, ...]] = tuple(result_data)

    return result_dict


pprint(pars_data_to_best_result('macbook pro'))
