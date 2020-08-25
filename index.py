import tornado.ioloop
import tornado.web
import asyncio
import os.path
import tornado.httpserver
from tornado.escape import json_decode

from config import DB_CONNECT_LOCAL
import psycopg2
from psycopg2.extras import DictCursor

db_name = DB_CONNECT_LOCAL['db_name']
user_db = DB_CONNECT_LOCAL['user_db']
db_password = DB_CONNECT_LOCAL['db_password']
db_host = DB_CONNECT_LOCAL['db_host']
db_port = DB_CONNECT_LOCAL['db_port']


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html', title='Блог любителей собакенов')


class Pyshhandler(tornado.web.RequestHandler):
    def post(self):
        self.request.headers.get("Content-Type", "").startswith("/push")
        self.json_args = json_decode(self.request.body)
        print(self.json_args['name'])


class FactsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('facts.html', title='10 фактов о бордер колли!')


def main():
    settings = {
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "cookie_secret": "__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
        "login_url": "/signin",
        "debug": True,
        "autoreload": True,
    }

    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/facts", FactsHandler),
        (r"/slider/(.*)", tornado.web.StaticFileHandler, {"path": "slider/"}),
        (r"/photos/(.*)", tornado.web.StaticFileHandler, {"path": "photos/"}),
        (r"/push", Pyshhandler),
    ],
        **settings)

    http_server = tornado.httpserver.HTTPServer(application)
    port = int(os.environ.get("PORT", 8888))
    http_server.listen(port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    print('Server running on 8888 port!')
    main()
