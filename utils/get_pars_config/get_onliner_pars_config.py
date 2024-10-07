from configobj import ConfigObj
from typing import Dict, Any


def get_onliner_pars_config() -> Dict[str, ...]:

    config: Any = ConfigObj('../../secret_data/config.ini')
    main_api_url: Dict[str, ...] = config['Pars']['Onliner']

    return main_api_url
