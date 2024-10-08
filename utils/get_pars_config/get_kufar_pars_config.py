import tomllib
from typing import Dict


def get_kufar_pars_config() -> Dict:

    with open('secret_data/config.toml', 'rb') as config:
        pars_kufar_config: Dict[str] = tomllib.load(config)['Pars']['Kufar']

    return pars_kufar_config
