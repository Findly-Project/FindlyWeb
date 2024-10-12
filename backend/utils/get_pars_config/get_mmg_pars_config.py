import tomllib
from typing import Dict


def get_mmg_pars_config() -> Dict[str, ...]:

    try:
        with open('secret_data/config.toml', 'rb') as config:
            pars_mmg_config: Dict[str, ...] = tomllib.load(config)['Pars']['MMG']
    except FileNotFoundError:
        with open('../../../secret_data/config.toml', 'rb') as config:
            pars_mmg_config: Dict[str, ...] = tomllib.load(config)['Pars']['MMG']

    return pars_mmg_config
