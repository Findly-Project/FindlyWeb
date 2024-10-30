from typing import Dict
from httpx import ReadTimeout, ConnectTimeout
from quart import Quart, jsonify, render_template, request, abort
from quart.helpers import make_response
from quart.wrappers import Response
from .get_products_data.collecting_primary_data.product_models import MarketPlaceList
from .get_products_data.output_of_results import output_of_results
import logging
from .utils.get_config.get_quart_config import GetQuartConfig
from .middleware.reject_middlware import reject_middlware


app: Quart = Quart(__name__)
config: Dict = GetQuartConfig.quart_settings()

DEBUG: bool = bool(int(config["DEBUG"]))
HOST: str = config["HOST"]
PORT: int = int(config["PORT"])


@app.errorhandler(404)
async def notfound_view(error) -> Response:
    content = await render_template("notfound_page.html")
    res = await make_response(content, 404)
    return res


@app.errorhandler(403)
async def unauthorized_view(error) -> Response:
    content = await render_template("unauthorized_page.html")
    res = await make_response(content, 403)
    return res


@app.route("/api/search", methods=["GET"])
async def main_view() -> Response | str:

    is_allowed: bool = await reject_middlware(request)
    if is_allowed:
        allowed_args = {'q',
                        'max_size',
                        'only_new'}

        q = request.args.get('q')
        if not q:
            abort(422)
        max_size = request.args.get('max_size', type=int)
        only_new = request.args.get('only_new', type=int)

        all_args = set(request.args.keys())
        query: str = request.args.get('q').replace("+", " ")
        try:
            data: MarketPlaceList = await output_of_results(query)
        except (ConnectTimeout, ReadTimeout):
            data: MarketPlaceList = await output_of_results(query)
        json_data: Dict = data.get_json()
        content = {"data": json_data}
        res = await make_response(content)
        if request.url.startswith('http://127.0.0.1:5000/api/search'):
            res.headers['Access-Control-Allow-Origin'] = '*'
        res.headers['Content-Type'] = 'application/json'
        return res
    else:
        await abort(403)


def backend_run():
    logging.basicConfig(
        level=logging.WARNING,
        filename="backend/secret_data/logs.log",
        filemode="a",
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n",
    )

    logging.warning("Start Findly...")
    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Start Findly..."))

    app.run(debug=DEBUG, host=HOST, port=PORT)
