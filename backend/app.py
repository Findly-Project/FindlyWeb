from quart import Quart, jsonify
from get_products_data.output_of_results import output_of_results
import logging
import tomllib

with open('secret_data/config.toml', 'rb') as config:
    config = tomllib.load(config)

app = Quart(__name__)

DEBUG = bool(int(config['Quart']['DEBUG']))


@app.route('/api/v1.0/search/q=<query>', methods=['GET'])
async def main_view(query):
    query = query.replace('+', ' ')
    data = output_of_results(query)

    return jsonify({'data': data})


if __name__ == '__main__':
    logging.basicConfig(level=logging.WARNING,
                        filename='secret_data/logs.log',
                        filemode='a',
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n')

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))

    app.run(debug=DEBUG)
