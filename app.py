from quart import Quart, render_template
from configparser import ConfigParser
import logging

app = Quart(__name__)
config = ConfigParser()

config.read('secret_data/config.ini')

DEBUG = bool(int(config['Quart']['DEBUG']))


@app.route('/')
async def main_view():
    return await render_template('base.html')


if __name__ == '__main__':
    logging.basicConfig(level=logging.WARNING,
                        filename='secret_data/logs.txt',
                        filemode='a',
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n')

    app.run(debug=DEBUG)

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))
