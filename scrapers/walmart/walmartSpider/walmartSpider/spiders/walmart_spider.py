from pathlib import Path

import scrapy


class WalmartSpider(scrapy.Spider):
    name = "walmart"

    def start_requests(self):
        urls = [
            # "https://www.walmart.com/search?q=frozen+foods&facet=category%3AFrozen+Meals+%26+Entrees",
            "https://www.walmart.com/ip/Kid-Cuisine-Popcorn-Chicken-and-Corn-Frozen-Meal-8-65-oz-Frozen/10813426?from=/search",
            "https://www.walmart.com/"
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        print("Test")
        print(f'TEST TEST TEST {response.css("h1::text").get()} TEST TEST TEST')
        # for quote in response.css(".ph1 .hide-sibling-opacity"):
        #     yield {
        #         "title": quote.css("title").getall(),
        #         "item": quote.css(".ph1 .hide-sibling-opacity").getall(),
        #         # "author": quote.css("small.author::text").get(),
        #         # "tags": quote.css("div.tags a.tag::text").getall(),
        #     }
        # page = "1" # response.url.split("/")[-2]
        # filename = f"walmart-{page}.html"
        # Path(filename).write_bytes(response.body)
        # self.log(f"Saved file {filename}")