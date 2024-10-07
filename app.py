from quart import Quart, render_template, redirect, request
from configobj import ConfigObj
import logging

app = Quart(__name__)
config = ConfigObj('secret_data/config.ini')

DEBUG = bool(int(config['Quart']['DEBUG']))


@app.route('/')
async def main_view():
    return redirect('search')


@app.route('/search', methods=['POST', 'GET'])
async def search_view():
    if request.method == 'GET':
        return await render_template('base.html')

    return await render_template('base.html')


if __name__ == '__main__':
    logging.basicConfig(level=logging.WARNING,
                        filename='secret_data/logs.txt',
                        filemode='a',
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n')

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))

    app.run(debug=DEBUG, host='192.168.19.105')
