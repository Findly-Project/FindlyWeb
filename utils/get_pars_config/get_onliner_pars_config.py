import tomllib
from typing import Dict


def get_onliner_pars_config() -> Dict[str, ...]:

    with open('secret_data/config.toml', 'rb') as config:
        main_api_url: Dict[str, ...] = tomllib.load(config)['Pars']['Onliner']

    return main_api_url
