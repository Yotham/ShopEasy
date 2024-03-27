import requests
from bs4 import BeautifulSoup

# URL of the page to be scraped
url = "https://www.traderjoes.com/home/products/category/food-8"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract data based on the structure of the webpage
    # For example, if the products are listed in <div> tags with class "product"
    products = soup.find_all('div', class_='product')

    # Loop through the extracted products and print their details
    for product in products:
        # Extract and print product details, such as name and price
        name = product.find('h3', class_='product-name').text.strip()
        price = product.find('span', class_='product-price').text.strip()
        print(f"Name: {name}, Price: {price}")
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
