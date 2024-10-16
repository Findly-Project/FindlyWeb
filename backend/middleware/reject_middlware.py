from typing import Dict, List
from backend.utils.get_config.get_quart_config import GetQuartConfig


class RejectMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        quart_security: Dict = GetQuartConfig.quart_security()
        allowed_ips: List = list(quart_security['allowed_ips'])

        if scope['client'][0] in allowed_ips:
            return await self.app(scope, receive, send)
        else:
            return await self.error_response(send)

    @staticmethod
    async def error_response(send):
        with open('local_data/middleware_data/unauthorized_page.html', 'r') as data:
            html_content = data.read()

        encoded_content = html_content.encode('utf-8')

        await send({
            'type': 'http.response.start',
            'status': 401,
            'headers': [
                (b'content-type', b'text/html; charset=utf-8'),
                (b'content-length', str(len(encoded_content)).encode('utf-8'))
            ]
        })

        await send({
            'type': 'http.response.body',
            'body': encoded_content
        })
