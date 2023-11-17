from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import quote
import json
from selenium.webdriver.firefox.service import Service
import re
import time


def get_product_details(url):
    """Get product details from a specified URL"""

    return #storage

def extract_number_of_servings(soup):
    serves_tag = soup.find('th', class_='Item_table__cell__aUMvf', text=re.compile('Serves'))
    if serves_tag:
        number_of_servings = int(re.search(r'\d+', serves_tag.text).group())
        return round(number_of_servings,2)
    return 1  # default to 1 if not found

def getLinkInfo(url):
    driver.get(url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.Section_section__headerText__2GTKM')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    return {
        'servingSize': serving_size,
        'numServings': number_of_servings,
        'CaloriesPS': calories,
        'FatPS': total_fat,
        'CarbPS': total_carbs,
        'ProteinPS': protein
    }


# Set up the Selenium driver for Firefox
options = webdriver.FirefoxOptions()
geckodriver_path = "./geckodriver.exe"  # replace with your path
service = Service(geckodriver_path)
driver = webdriver.Firefox(service=service, options=options)

wait = WebDriverWait(driver, 60)  # Wait up to 60 seconds

# Initial URL
initial_url = ""
products = {"1": get_product_details(initial_url)}

soup = BeautifulSoup(driver.page_source, 'html.parser')
pages = soup.find_all('', class_='')

for i in range(1, len(pages) - 1):
    page_filter = quote(f'{{"page":{i + 1}}}')
    url = f"}"
    products[str(i + 1)] = get_product_details(url)

with open("output.html", "w", encoding="utf-8") as file:
    file.write(soup.prettify())


i = 0
for key in products.keys():
    for item in products[key]:
        print("Item:",item)
        url = products[key][item]["link"]
        products[key][item]["Nutrition"] = getLinkInfo(url)
    
        
with open('walmartData.json', 'w', encoding="utf-8") as json_file:
    json.dump(products, json_file,ensure_ascii=False, indent=4)
driver.quit()
