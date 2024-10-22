from typing import Dict, List
from backend.utils.get_config.get_quart_config import GetQuartConfig


class RejectMiddleware:
    def __init__(self, app, path_to_protect):
        self.app = app
        self.path_to_protect = path_to_protect

    async def __call__(self, scope, receive, send):
        if scope["path"].startswith(self.path_to_protect):
            quart_security: Dict = GetQuartConfig.quart_security()
            allowed_ips: List = list(quart_security["allowed_ips"])

            if scope["client"][0] in allowed_ips:
                return await self.app(scope, receive, send)
            else:
                return await self.redirect_response(send, "/unauthorized")
        else:
            return await self.app(scope, receive, send)

    @staticmethod
    async def redirect_response(send, location):
        await send(
            {
                "type": "http.response.start",
                "status": 301,
                "headers": [
                    (b"location", location.encode("utf-8")),
                    (b"content-type", b"text/html; charset=utf-8"),
                ],
            }
        )
        await send({"type": "http.response.body", "body": b"Redirecting..."})
