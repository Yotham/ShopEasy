from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
import json

# Function to scrape data from a single page

def format_nutrient_value(value):
    if value.strip().lower() == "lessthan1g":
        return "0g"
    else:
        return re.sub(r'\s+', '', value)
    
def scrape_page(url):
    # Open the URL in the browser
    driver.get(url)

    # Wait for the content to load
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".ProductCard_card_verticalCard__1qP8Z"))
        )
    except:
        return

    # Get the page source and parse it with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Extract data based on the structure of the webpage
    products = soup.find_all('section', class_='ProductCard_card_verticalCard__1qP8Z')

    for product in products:
        product_name = product.find('h2', class_='ProductCard_card__title__text__uiWLe').get_text(strip=True)
        product_link = "https://www.traderjoes.com" + product.find('a', class_='Link_link__1AZfr').get('href')
        product_price = product.find('div', class_='ProductPrice_productPrice__1Rq1r').get_text(strip=True)

        # Extract just the numeric part of the price
        match = re.search(r'\$([0-9.]+)', product_price)
        if match:
            product_price = match.group(1)

        storage[product_name] = {}
        storage[product_name]["link"] = product_link
        storage[product_name]["price"] = product_price

# Main code
geckodriver_path = "./geckodriver.exe"
storage = {}

# Set up the Firefox WebDriver
service = Service(executable_path=geckodriver_path)
driver = webdriver.Firefox(service=service)

# Base URL of the page to be scraped
base_url = "https://www.traderjoes.com/home/products/category/food-8"

# Number of pages to scrape
num_pages = 58  # Adjust this number based on the total number of pages

# Loop through each page and scrape data
for page in range(1, num_pages + 1):
    if page == 1:
        url = base_url
    else:
        url = f"{base_url}?filters=%7B%22page%22%3A{page}%7D"
    scrape_page(url)


# Print the storage dictionary to see the results
print(storage)

# Close the browser
for product_name, product_info in storage.items():
    # Open the product's URL in the browser
    driver.get(product_info["link"])

    # Wait for the content to load (adjust the timeout as needed)
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".NutritionFacts_nutritionFacts__1Nvz0"))
        )
    except:
        continue

    try:
        # Get the page source and parse it with BeautifulSoup
        product_soup = BeautifulSoup(driver.page_source, 'html.parser')

        serving_size = product_soup.find('div', class_='Item_characteristics__title__7nfa8', text='serving size').find_next_sibling().text.strip()
        storage[product_name]["serving_size"] = serving_size

        caloriesPS = product_soup.find('div', class_='Item_characteristics__title__7nfa8', text='calories per serving').find_next_sibling().text.strip()
        storage[product_name]["caloriesPS"] = caloriesPS

        numServings = product_soup.find('th', class_='Item_table__cell__aUMvf', text=re.compile('Serves'))
        # Extract just the numeric part of the servings
        if numServings:
            match = re.search(r'\b(\d+)\b', numServings.text)
            if match:
                numServings = match.group(1)
                storage[product_name]["numServings"] = numServings.strip()
        
        FatPS = product_soup.find('td', class_='Item_table__cell__aUMvf', text='Total Fat').find_next_sibling().text.strip()
        FatPS = re.sub(r'\s+', '', FatPS)
        CarbPS = product_soup.find('td', class_='Item_table__cell__aUMvf', text='Total Carbohydrate').find_next_sibling().text.strip()
        CarbPS = re.sub(r'\s+', '', CarbPS)
        ProteinPS = product_soup.find('td', class_='Item_table__cell__aUMvf', text='Protein').find_next_sibling().text.strip()
        ProteinPS = re.sub(r'\s+', '', ProteinPS)

        if FatPS == "lessthan1g":
            FatPS = "0g"
        if CarbPS == "lessthan1g":
            CarbPS = "0g"
        if ProteinPS == "lessthan1g":  
            ProteinPS = "0g"

        storage[product_name]["FatPS"] = FatPS
        storage[product_name]["CarbPS"] = CarbPS
        storage[product_name]["ProteinPS"] = ProteinPS
    except:
        continue

# Close the browser
    
driver.quit()
with open('AllTraderJoes.json', 'w', encoding="utf-8") as json_file:
    json.dump(storage, json_file,ensure_ascii=False, indent=4)

