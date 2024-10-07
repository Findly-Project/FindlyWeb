from configobj import ConfigObj
from typing import Any, Dict


def get_mmg_pars_config() -> Dict[str, ...]:

    config: Any = ConfigObj('../../../secret_data/config.ini')
    pars_mmg_config: Dict[str, ...] = config['Pars']['MMG']

    return pars_mmg_config
