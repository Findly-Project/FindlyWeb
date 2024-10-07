from configobj import ConfigObj
from typing import Dict, Any


def get_kufar_pars_config() -> Dict:

    config: Any = ConfigObj('../../secret_data/config.ini')
    pars_kufar_config: Dict[str] = config['Pars']['Kufar']

    return pars_kufar_config
