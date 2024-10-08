import tomllib
from typing import Dict


def get_21vek_pars_config() -> Dict[str, ...]:

    with open('secret_data/config.toml', 'rb') as config:
        pars_21vek_config: Dict[str, ...] = tomllib.load(config)['Pars']['21vek']

    return pars_21vek_config
