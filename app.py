from quart import Quart, request, render_template
from configparser import ConfigParser

app = Quart(__name__)
config = ConfigParser()

config.read('secret_data/config.ini')

DEBUG = bool(int(config['Quart']['DEBUG']))


@app.route('/')
async def main_view():
    return await render_template('base.html')


if __name__ == '__main__':
    app.run(debug=DEBUG)
