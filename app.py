from quart import Quart, jsonify, make_response
from quart_httpauth import HTTPBasicAuth
from get_products_data.middlewares.get_pars_data_to_best_results import pars_data_to_best_results
import logging
import tomllib
from werkzeug.security import generate_password_hash, check_password_hash

with open('secret_data/config.toml', 'rb') as config:
    config = tomllib.load(config)

auth = HTTPBasicAuth()
app = Quart(__name__)

DEBUG = bool(int(config['Quart']['DEBUG']))


users = {
    "john": generate_password_hash("hello"),
    "susan": generate_password_hash("bye")
}


@auth.error_handler
def unauthorized():
    return await make_response(jsonify({'error': 'Unauthorized access'}), 401)


@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username


@app.route('/api/v1.0/search/q=<query>', methods=['GET'])
@auth.login_required
async def main_view(query):
    query = query.replace('+', ' ')
    data = pars_data_to_best_results.pars_data_to_best_result(query)

    return jsonify({'data': data})


if __name__ == '__main__':
    logging.basicConfig(level=logging.WARNING,
                        filename='secret_data/logs.log',
                        filemode='a',
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n')

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))

    app.run(debug=DEBUG)
