import tomllib
from typing import Dict


def get_onliner_pars_config() -> Dict[str, ...]:
    try:
        with open('secret_data/config.toml', 'rb') as config:
            pars_onliner_config: Dict[str, ...] = tomllib.load(config)['Pars']['Onliner']
    except FileNotFoundError:
        with open('../../../secret_data/config.toml', 'rb') as config:
            pars_onliner_config: Dict[str, ...] = tomllib.load(config)['Pars']['Onliner']

    return pars_onliner_config
