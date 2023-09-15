from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import quote
import json
from selenium.webdriver.firefox.service import Service


def get_product_details(url):
    """Get product details from a specified URL"""
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

def getLinkInfo(url):
    driver.get(url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.Section_section__headerText__2GTKM')))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    serving = soup.find_all('div', class_='Item_characteristics__text__dcfEC')
    name = soup.find('div', class_= 'Item_characteristics__title__7nfa8').text
    print(name)
    '''
    for div in serving:
        subtext_element = div.find('sub')
        subtext = subtext_element.text if subtext_element else None
        main_text = div.text.replace(subtext, '') if subtext else div.text
        print("Main Text:", main_text.strip())
        print("Subtext:", subtext)
    '''

# Set up the Selenium driver for Firefox
options = webdriver.FirefoxOptions()
geckodriver_path = "./geckodriver.exe"  # replace with your path
service = Service(geckodriver_path)
driver = webdriver.Firefox(service=service, options=options)

wait = WebDriverWait(driver, 60)  # Wait up to 60 seconds

# Initial URL
initial_url = "https://www.traderjoes.com/home/products/category/entrees-sides-101"
products = {"1": get_product_details(initial_url)}

soup = BeautifulSoup(driver.page_source, 'html.parser')
pages = soup.find_all('li', class_='PaginationItem_paginationItem__2f87h')

for i in range(1, len(pages) - 1):
    page_filter = quote(f'{{"page":{i + 1}}}')
    url = f"https://www.traderjoes.com/home/products/category/entrees-sides-101?filters={page_filter}"
    products[str(i + 1)] = get_product_details(url)

# Save data to files
with open("output.html", "w", encoding="utf-8") as file:
    file.write(soup.prettify())

with open('data.json', 'w', encoding="utf-8") as json_file:
    json.dump(products, json_file,ensure_ascii=False, indent=4)

for key in products.keys():
    for item in products[key]:
        url = products[key][item]["link"]
        getLinkInfo(url)

driver.quit()
