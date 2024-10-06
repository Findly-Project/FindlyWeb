from get_products_data.get_pars_data.get_21vek_data import get_21vek_data
from typing import Dict, List
from get_products_data.middlewares.finding_best_result.vector_representations_of_words import vector_representations_of_words


def _21_vek_pars_data_to_best_result(query: str):

    pars_data: List[Dict[str, ...]] = get_21vek_data(query)

    products_names = [x['name'] for x in pars_data]
    best_result = vector_representations_of_words(query, products_names)

    best_item = list(filter(lambda x: x['name'] == best_result, pars_data))[0]

    return best_item


print(_21_vek_pars_data_to_best_result('iphone 15'))

