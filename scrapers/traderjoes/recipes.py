from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json

# Set up WebDriver
driver = webdriver.Firefox()

# Open a webpage
base_url = "https://www.traderjoes.com"
url = urljoin(base_url, "/home/recipes")
driver.get(url)

# # Find the search input element
# search_input = driver.find_element(By.NAME, "q")

# # Enter a search query
# search_input.send_keys("OpenAI")

# # Submit the search query
# search_input.send_keys(Keys.RETURN)

# # Wait for search results to load
# WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "search")))

storage = {}
classes_dict = {
    "RecipeCard": "Link_link__1AZfr RecipeGridCard_recipe__1Wo__ RecipeGridCard_recipe__tan__12uua",
}
WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.RecipesGrid_recipesGrid__results__CGnEX a')))

# Parse the page source with Beautiful Soup
soup = BeautifulSoup(driver.page_source, "html.parser")

recipe_links = soup.select('div.RecipesGrid_recipesGrid__results__CGnEX a')
# Iterate over each <a> element to extract sub-elements
for link in recipe_links:
    # Extracting attributes and text from each <a> element
    href = link['href']
    img_src = link.select_one('div.RecipeGridCard_recipe__img__1hv4j img')['srcoriginal']
    categories = link.select_one('p.RecipeGridCard_recipe__categories__3b5AM').text
    title = link.select_one('h3.RecipeGridCard_recipe__title__3-8S-').text

    # Print or process the extracted data as needed
    storage[title] = {}
    storage[title]["link"] = href
    storage[title]["image"] = img_src
    storage[title]["categories"] = categories
    storage[title]["image_src"] = img_src



if len(recipe_links) > 0:

    print("Found", len(recipe_links), "recipes")

for key in storage.keys():
    url = base_url+storage[key]['link']
    print(url)
    driver.get(url)
    # Wait for the content to load
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".ProductCard_card_verticalCard__1qP8Z"))
        )
    except:
        pass

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Find all li elements within the specified class
    li_elements = soup.find('ul', class_='IngredientsList_ingredientsList__1LoAJ').find_all('li')

    # Print the text of each li element
    ingredients = []
    for li in li_elements:
        ingredients.append(li.text.strip())
    storage[key]['ingredients'] = ingredients
# # Find all search result titles
# search_results = soup.find_all("a", class_=classes_dict["RecipeCard"])

# # Print out search result titles
# for result in search_results:
#     print(result.text)

with open('TJrecipes.json', 'w', encoding="utf-8") as json_file:
    json.dump(storage, json_file,ensure_ascii=False, indent=4)
    
driver.quit()

