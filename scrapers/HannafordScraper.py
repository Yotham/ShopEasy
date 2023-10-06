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

"""
def get_product_details(url):
    #Get product details from a specified URL
    driver.get(url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.PaginationItem_paginationItem__2f87h')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    h2_tags = soup.find_all('h2', class_='ProductCard_card__title__text__uiWLe')
    hrefs = [h2.find('a', class_='Link_link__1AZfr')['href'] for h2 in h2_tags]
    links = []
    storage = {}
    for a in hrefs: 
        link = "https://www.traderjoes.com" + str(a)
        links.append(link)
         

    productNames = [product.get_text(strip=True) for product in soup.find_all('h2', class_='ProductCard_card__title__text__uiWLe')]

    for i in range(len(links)):
        storage[productNames[i]] = {}
        storage[productNames[i]]["link"] = links[i]

    return storage

def extract_number_of_servings(soup):
    serves_tag = soup.find('th', class_='Item_table__cell__aUMvf', text=re.compile('Serves'))
    if serves_tag:
        number_of_servings = int(re.search(r'\d+', serves_tag.text).group())
        return number_of_servings
    return 1  # default to 1 if not found

def getLinkInfo(url):
    driver.get(url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.Section_section__headerText__2GTKM')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    NutritionFacts = soup.find('div', class_='NutritionFacts_nutritionFacts__1Nvz0')
    if NutritionFacts == None:
        return {"None":0}
    
    serving_size = NutritionFacts.find('div', class_='Item_characteristics__title__7nfa8', text='serving size').find_next_sibling().text
    print(serving_size)
    # Get serving size in grams (assuming it's formatted like "xxx g")

    match = re.search(r'(\d+)g', serving_size)
    if match:
        serving_size_grams = int(match.group(1))
    else:
        serving_size_grams = 99999  # Default to 1 if not found in "xxx g" format
    

    # Extract the amount in oz from the provided div/span class
    amount_oz_div = soup.find('div', class_='ProductPrice_productPrice__wrapper__20hep')
    if amount_oz_div:
        amount_oz_span = amount_oz_div.find('span', class_='ProductPrice_productPrice__unit__2jvkA')
        if amount_oz_span:
            amount_oz_text = amount_oz_span.text
            amount_oz = float(re.search(r'\d+\.?\d*', amount_oz_text).group())
            print(amount_oz)
            # Convert the amount from oz to grams
            amount_grams = amount_oz * 28.35
            print(amount_grams)
            number_of_servings = amount_grams / serving_size_grams
        else:
            number_of_servings = 1
    else:
        number_of_servings = 1
    if serving_size_grams == 99999:
        number_of_servings = 1
    
    # Helper function to extract nutrient values
    def get_nutrient_value(nutrient_name):
        nutrient = NutritionFacts.find('td', class_='Item_table__cell__aUMvf', text=nutrient_name)
        if nutrient:
            return nutrient.find_next_sibling().text
        return {"None":0}

    total_fat = get_nutrient_value('Total Fat')
    total_carbs = get_nutrient_value('Total Carbohydrate')
    protein = get_nutrient_value('Protein')

    return {
        'serving_size': serving_size,
        'number_of_servings': number_of_servings,
        'total_fat_per_serving': total_fat,
        'total_carbs_per_serving': total_carbs,
        'protein_per_serving': protein
    }
"""
# Set up the Selenium driver for Firefox
options = webdriver.FirefoxOptions()
geckodriver_path = "./geckodriver.exe"  # replace with your path
service = Service(geckodriver_path)
driver = webdriver.Firefox(service=service, options=options)

wait = WebDriverWait(driver, 60)  # Wait up to 60 seconds

# Initial URL
initial_url = "https://www.hannaford.com/departments/frozen/frozen-dinners-entrees?displayAll=true"
#products = {"1": get_product_details(initial_url)}

soup = BeautifulSoup(driver.page_source, 'html.parser')
pages = soup.find_all('li', class_='PaginationItem_paginationItem__2f87h')

"""
for i in range(1, len(pages) - 1):
    page_filter = quote(f'{{"page":{i + 1}}}')
    url = f"https://www.traderjoes.com/home/products/category/entrees-sides-101?filters={page_filter}"
    products[str(i + 1)] = get_product_details(url)

with open("output.html", "w", encoding="utf-8") as file:
    file.write(soup.prettify())


i = 0
for key in products.keys():
    for item in products[key]:
        print("Item:",item)
        url = products[key][item]["link"]
        products[key][item]["Nutrition"] = getLinkInfo(url)
        
with open('data.json', 'w', encoding="utf-8") as json_file:
    json.dump(products, json_file,ensure_ascii=False, indent=4)
driver.quit()
"""