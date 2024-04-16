from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time

# Set up WebDriver
driver = webdriver.Firefox()
base_url = "https://www.traderjoes.com"
storage = {}

# Function to process each page
def process_page(url):
    driver.get(url)
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.RecipesGrid_recipesGrid__results__CGnEX a')))
    soup = BeautifulSoup(driver.page_source, "html.parser")
    recipe_links = soup.select('div.RecipesGrid_recipesGrid__results__CGnEX a')

    for link in recipe_links:
        title = link.select_one('h3.RecipeGridCard_recipe__title__3-8S-').text
        href = base_url + link['href']
        img_src = link.select_one('div.RecipeGridCard_recipe__img__1hv4j img')['src']
        categories = link.select_one('p.RecipeGridCard_recipe__categories__3b5AM').text
        
        storage[title] = {
            "link": href,
            "image": img_src,
            "categories": categories,
            "ingredients": []
        }
        
        # Fetching ingredients for each recipe
        driver.get(href)
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.IngredientsList_ingredientsList__1LoAJ')))
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        ingredients = [li.text.strip() for li in soup.find('ul', class_='IngredientsList_ingredientsList__1LoAJ').find_all('li')]
        storage[title]['ingredients'] = ingredients
        time.sleep(1)  # Small delay to not overwhelm the server

# Loop through all pages
num_pages = 39  # Number of pages you want to crawl
for page_number in range(1, num_pages + 1):
    page_url = f"{base_url}/home/recipes?page={page_number}"
    process_page(page_url)
    print(f"Processed page {page_number}")

# Save the data to a JSON file
with open('TJrecipes.json', 'w', encoding="utf-8") as json_file:
    json.dump(storage, json_file, ensure_ascii=False, indent=4)

driver.quit()
