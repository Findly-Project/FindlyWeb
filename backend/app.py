from typing import Dict, Any, BinaryIO
from quart import Quart, jsonify
from get_products_data.collecting_primary_data.product_models import MarketPlaceList
from get_products_data.output_of_results import output_of_results
import logging
import tomllib

with open("secret_data/config.toml", "rb") as config:
    config: Dict[str, Any] | BinaryIO = tomllib.load(config)

app: Quart = Quart(__name__)

DEBUG: bool = bool(int(config["Quart"]["DEBUG"]))
HOST: str = config["Quart"]["HOST"]
PORT: int = int(config["Quart"]["PORT"])


@app.route("/api/v1.0/search/q=<query>", methods=["GET"])
async def main_view(query):
    query: str = query.replace("+", " ")
    data: MarketPlaceList = await output_of_results(query)

    json_data: Dict = data.get_json()

    return jsonify({"data": json_data})


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.WARNING,
        filename="secret_data/logs.log",
        filemode="a",
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s\n\n\n",
    )

    logging.warning("Start Product Analyzer...")

    print("\n\033[1m\033[30m\033[44m {} \033[0m".format("Starting Product Analyzer..."))

    app.run(debug=DEBUG, host=HOST, port=PORT)
