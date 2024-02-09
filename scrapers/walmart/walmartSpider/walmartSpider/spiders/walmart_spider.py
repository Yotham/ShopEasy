from pathlib import Path

import scrapy


class WalmartSpider(scrapy.Spider):
    name = "walmart"

    def start_requests(self):
        urls = [
            "https://www.walmart.com/",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = "1" # response.url.split("/")[-2]
        filename = f"walmart-{page}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")