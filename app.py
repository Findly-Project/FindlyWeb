from quart import Quart, request, render_template

app = Quart(__name__)


@app.route('/')
async def main_view():

    return await render_template('base.html')


if __name__ == '__main__':

    app.run()
