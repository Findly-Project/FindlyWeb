from configobj import ConfigObj
from typing import Any, Dict


def get_21vek_pars_config() -> Dict[str, ...]:

    config: Any = ConfigObj('../../secret_data/config.ini')
    pars_21vek_config: Dict[str, ...] = config['Pars']['21vek']

    return pars_21vek_config
