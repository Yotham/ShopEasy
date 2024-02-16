
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode

headers={"User-Agent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"}

product_data_list = []

## Loop Through Walmart Product URL List
for url in product_url_list:
    try:
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            html_response = response.text
            soup = BeautifulSoup(html_response, "html.parser")
            script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
            if script_tag is not None:
                json_blob = json.loads(script_tag.get_text())
                raw_product_data = json_blob["props"]["pageProps"]["initialData"]["data"]["product"]
                product_data_list.append({
                    'id':  raw_product_data.get('id'),
                    'type':  raw_product_data.get('type'),
                    'name':  raw_product_data.get('name'),
                    'brand':  raw_product_data.get('brand'),
                    'averageRating':  raw_product_data.get('averageRating'),
                    'manufacturerName':  raw_product_data.get('manufacturerName'),
                    'shortDescription':  raw_product_data.get('shortDescription'),
                    'thumbnailUrl':  raw_product_data['imageInfo'].get('thumbnailUrl'),
                    'price':  raw_product_data['priceInfo']['currentPrice'].get('price'), 
                    'currencyUnit':  raw_product_data['priceInfo']['currentPrice'].get('currencyUnit'),  
                })
                    
    except Exception as e:
        print('Error', e)
            
    
print(product_data_list)
