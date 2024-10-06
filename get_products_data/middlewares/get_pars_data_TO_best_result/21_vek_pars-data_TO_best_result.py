from get_products_data.get_pars_data.get_21vek_data import get_21vek_data
from typing import Dict, List
from get_products_data.middlewares.finding_best_result import vector_representations_of_words
from get_products_data.middlewares.finding_best_result import regular_expression


def _21_vek_pars_data_to_best_result(query: str):

    pars_data: List[Dict[str, ...]] = get_21vek_data(query)

    product_names = [x['name'] for x in pars_data]

    first_step_to_find_best_result = regular_expression.regular_expression(query, product_names)
    best_result = vector_representations_of_words.vector_representations_of_words(query, first_step_to_find_best_result)

    best_item = list(filter(lambda x: x['name'] == best_result, pars_data))[0]

    return best_item


print(_21_vek_pars_data_to_best_result('i'))

