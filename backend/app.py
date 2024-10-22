from typing import Dict
from quart import Quart, jsonify, render_template
from quart.wrappers import Response
from .get_products_data.collecting_primary_data.product_models import MarketPlaceList
from .get_products_data.output_of_results import output_of_results
import logging
from .utils.get_config.get_quart_config import GetQuartConfig
from .middleware.reject_middlware import RejectMiddleware


app: Quart = Quart(__name__)
app.asgi_app = RejectMiddleware(app.asgi_app, "/api/v1.0/search/")

config: Dict = GetQuartConfig.quart_settings()

DEBUG: bool = bool(int(config["DEBUG"]))
HOST: str = config["HOST"]
PORT: int = int(config["PORT"])


@app.route("/unauthorized")
async def unauthorized_view():
    return await render_template("unauthorized_page.html")


@app.route("/api/v1.0/search/q=<query>", methods=["GET"])
async def main_view(query) -> Response:
    query: str = query.replace("+", " ")
    data: MarketPlaceList = await output_of_results(query)

    json_data: Dict = data.get_json()

    return jsonify({"data": json_data})


def backend_run():
    logging.basicConfig(
        level=logging.WARNING,
        filename="backend/secret_data/logs.log",
        filemode="a",
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n",
    )

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))

    app.run(debug=DEBUG, host=HOST, port=PORT)
