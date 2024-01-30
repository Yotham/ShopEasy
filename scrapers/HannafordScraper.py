from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import quote
import json
from selenium.webdriver.firefox.service import Service
import re
from selenium.webdriver.common.keys import Keys
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import json
from selenium.webdriver.firefox.service import Service

def get_product_details(url, max_retries=1):
    """Get product details from a specified URL"""
    driver.get(url)
    
    storage = {}
    prev_product_count = 0
    
    while True:
        # Parse the page with BeautifulSoup and extract product data
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        product_containers = soup.find_all('div', class_='catalog-product')
        
        # Check if new products have been loaded
        if len(product_containers) == prev_product_count:
            print("No new products loaded. Ending scraping.")
            break
        # Update the product count
        prev_product_count = len(product_containers)
        
        for product in product_containers:
            data_url = product.get('data-url')
            if data_url:
                product_name = product.get('data-product-name')
                product_url = f"https://www.hannaford.com{data_url}"
                storage[product_name] = {"link": product_url}
        
        retries = 0
        while retries < max_retries:
            try:
                # Wait until the "catalog-product" is loaded
                wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.catalog-product')))
                #locate see-more-btn
                see_more_button = driver.find_element(By.CSS_SELECTOR, '.see-more-btn')
                
                # Scroll to the button and adjust offset, then click it
                driver.execute_script("arguments[0].scrollIntoView();", see_more_button)
                driver.execute_script("window.scrollBy(0, -150);")  
                
                # Use JavaScript to click the button
                driver.execute_script("arguments[0].click();", see_more_button)
                
                # Wait a bit for new products to load
                time.sleep(2)
                break  # Exit the retry loop if the click was successful
            except Exception as e:
                print(f"Attempt {retries + 1}")
                retries += 1
        
        if retries == max_retries:
            print("Reached end. Ending scraping.")
            break
    
    return storage



"""
def extract_number_of_servings(soup):
    serves_tag = soup.find('th', class_='Item_table__cell__aUMvf', text=re.compile('Serves'))
    if serves_tag:
        number_of_servings = int(re.search(r'\d+', serves_tag.text).group())
        return number_of_servings
    return 1  # default to 1 if not found
"""

import re
from bs4 import BeautifulSoup

def getLinkInfo(url):
    driver.get(url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#panelNutrition')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    nutrition_info = {}
    no_nutrition_tag = soup.find("p", class_="no-nutrition")
    if no_nutrition_tag:
        print("No nutritional information available for", url)
        return {"None": 0}
    # Extract serving size in grams
    serving_size_tag = soup.find("dl", class_="serving-size")
    if serving_size_tag:
        serving_size = serving_size_tag.find("dd").get_text(strip=True)
        nutrition_info['servingSize'] = serving_size
    
    # Extract number of servings
    servings_per_tag = soup.find("h3", class_="servings-per")
    if servings_per_tag:
        servings_text = servings_per_tag.get_text(strip=True)
        match = re.search(r'(\d+)', servings_text)
        if match:
            nutrition_info['numServings'] = int(match.group(1))
        else:
            nutrition_info['numServings'] = None
    
    # Helper function to extract nutrient values
    def extract_nutrient(dt_text):
        dt = soup.find("dt", string=re.compile(dt_text, re.IGNORECASE))
        if dt:
            dd = dt.find_next_sibling("dd")
            if dd:
                # Extract numerical value from text, if possible
                match = re.search(r'(\d+\.?\d*)', dd.get_text(strip=True))
                return float(match.group(1)) if match else None
        return None
    
    # Extracting nutritional values
    nutrition_info['CaloriesPS'] = extract_nutrient("Calories")
    nutrition_info['FatPS'] = extract_nutrient("Total Fat")
    nutrition_info['CarbPS'] = extract_nutrient("Total Carbohydrate")
    nutrition_info['ProteinPS'] = extract_nutrient("Protein")
    
    return nutrition_info



# Set up the Selenium driver for Firefox
options = webdriver.FirefoxOptions()
geckodriver_path = "./geckodriver.exe"  # replace with your path
service = Service(geckodriver_path)
driver = webdriver.Firefox(service=service, options=options)

wait = WebDriverWait(driver, 60)  # Wait up to 60 seconds
# Initial URL
initial_url = "https://www.hannaford.com/departments/frozen/frozen-dinners-entrees?displayAll=true"
products = {"1": get_product_details(initial_url)}
soup = BeautifulSoup(driver.page_source, 'html.parser')
pages = soup.find_all('li', class_='PaginationItem_paginationItem__2f87h')
#print(products)
for key in products.keys():
    for item in products[key]:
        print("Item:",item)
        url = products[key][item]["link"]
        products[key][item]["Nutrition"] = getLinkInfo(url)
with open('data.json', 'w', encoding="utf-8") as json_file:
    json.dump(products, json_file,ensure_ascii=False, indent=4)
driver.quit()