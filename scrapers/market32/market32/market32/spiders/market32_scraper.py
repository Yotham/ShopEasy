from pathlib import Path

import scrapy


class Market32Spider(scrapy.Spider):
    name = "market32"

    def start_requests(self):
        urls = [
            "https://shop.pricechopper.com/shop/categories/18",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        print(response.body)