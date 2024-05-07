from typing import List
from txsocksx.http import SOCKS5Agent
from twisted.internet import reactor
from twisted.internet.endpoints import TCP4ClientEndpoint
from scrapy.core.downloader.handlers.http11 import HTTP11DownloadHandler, ScrapyAgent
import random
from urllib.parse import urlsplit
from loguru import logger

# Ref https://txsocksx.readthedocs.io/en/latest/#txsocksx.http.SOCKS5Agent

import certifi, os

os.environ["SSL_CERT_FILE"] = certifi.where() # if not setted , you'll got an ERROR : certificate verify failed')] [<twisted.python.failure.Failure OpenSSL.SSL.Error: [('STORE routines', '', 'unregistered scheme')


class Socks5DownloadHandler(HTTP11DownloadHandler):

    def download_request(self, request, spider):
        """Return a deferred for the HTTP download"""
        settings = spider.settings
        agent = ScrapySocks5Agent(settings, contextFactory=self._contextFactory, pool=self._pool, crawler=self._crawler)
        return agent.download_request(request)


class ScrapySocks5Agent(ScrapyAgent):
    def __init__(self, settings, **kwargs):
        """
        init proxy pool
        """
        super(ScrapySocks5Agent, self).__init__(**kwargs)
        self.__proxy_file = settings['PROXY_FILE']
        self._s5proxy_pool: List = self.__get_s5proxy_pool()

    def _get_agent(self, request, timeout):
        _, proxy_host, proxy_port, proxy_user, proxy_pass = self.__random_choose_proxy()
        proxy_user = bytes(map(ord, proxy_user))  # It's very strange, may be it's a BUG
        proxy_pass = bytes(map(ord, proxy_pass)) # It's very strange, may be it's a BUG
        proxyEndpoint = TCP4ClientEndpoint(reactor, proxy_host, proxy_port)
        agent = SOCKS5Agent(reactor, proxyEndpoint=proxyEndpoint,
                            endpointArgs=dict(methods={'login': [proxy_user, proxy_pass]}))
        return agent

    def __get_s5proxy_pool(self) -> List:
        """
        return proxy pool
        :return:
        """
        proxy_list = []
        with open(self.__proxy_file, 'r') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                else:
                    proxy_info = urlsplit(line)
                    schema, user, passwd, host, port = proxy_info.scheme, proxy_info.username, proxy_info.password, proxy_info.hostname, proxy_info.port
                    proxy_list.append((schema, host, port, user, passwd))

        return proxy_list

    def __random_choose_proxy(self):
        """
        schema, host, port, user, pass
        :return:
        """
        p = random.choice(self._s5proxy_pool)
        logger.info("use proxy {}", p)
        return p

