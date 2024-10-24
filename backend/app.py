from typing import Dict
from quart import Quart, jsonify, render_template, request, abort
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
async def notfound_view(error) -> str:
    return await render_template("notfound_page.html")


@app.errorhandler(403)
async def unauthorized_view(error) -> str:
    return await render_template("unauthorized_page.html")


@app.route("/api/search&q=<query>", methods=["GET"])
async def main_view(query) -> Response | str:
    is_allowed: bool = await reject_middlware(request)
    if is_allowed:
        query: str = query.replace("+", " ")
        data: MarketPlaceList = await output_of_results(query)

        json_data: Dict = data.get_json()

        return jsonify({"data": json_data})
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
