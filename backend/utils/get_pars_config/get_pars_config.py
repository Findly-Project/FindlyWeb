import tomllib
from typing import Dict


class GetParsConfig:

    @staticmethod
    def get_21vek_pars_config() -> Dict:
        with open('secret_data/config.toml', 'rb') as config:
            pars_21vek_config: Dict[str] = tomllib.load(config)['Pars']['21vek']

        return pars_21vek_config

    @staticmethod
    def get_kufar_pars_config() -> Dict:
        with open('secret_data/config.toml', 'rb') as config:
            pars_kufar_config: Dict[str] = tomllib.load(config)['Pars']['Kufar']

        return pars_kufar_config

    @staticmethod
    def get_mmg_pars_config() -> Dict:
        with open('secret_data/config.toml', 'rb') as config:
            pars_mmg_config: Dict[str] = tomllib.load(config)['Pars']['MMG']

        return pars_mmg_config

    @staticmethod
    def get_onliner_pars_config() -> Dict:
        with open('secret_data/config.toml', 'rb') as config:
            pars_onliner_config: Dict[str] = tomllib.load(config)['Pars']['Onliner']

        return pars_onliner_config
