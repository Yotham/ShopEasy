from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Set up WebDriver
driver = webdriver.Firefox()

# Open a webpage
base_url = "https://www.traderjoes.com"
url = urljoin(base_url, "/home/recipes/")


driver.get(urljoin(url, 'instantly-elevated-brownies'))
# Wait for the content to load
try:
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".ProductCard_card_verticalCard__1qP8Z"))
    )
except:
    pass


soup = BeautifulSoup(driver.page_source, 'html.parser')


# Find the ul element with the specified class
ul_element = soup.find("ul", class_="IngredientsList_ingredientsList__1LoAJ")

# Get the text of each li element within the ul element
if ul_element:
    li_elements = ul_element.find_all("li")
    for li in li_elements:
        print(li.text)
        
# # Find all li elements within the specified class
# print(soup.select('#_home_recipes_instantly-elevated-brownies_jcr_content_root_body_section_recipe_info_recipe_ingredients > div > div > ul'))
# li_elements = soup.find('ul', class_='IngredientsList_ingredientsList__1LoAJ').find_all('li')

# Print the text of each li element
for li in li_elements:
    print(li.text)
# # Find all search result titles
# search_results = soup.find_all("a", class_=classes_dict["RecipeCard"])

# # Print out search result titles
# for result in search_results:
#     print(result.text)
    
driver.quit()

