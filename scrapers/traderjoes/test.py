from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import os.path

# Set up WebDriver
driver = webdriver.Firefox()

# Open a webpage
base_url = "https://www.traderjoes.com"
url = os.path.join(base_url, "/home/recipes")
driver.get(url)

# # Find the search input element
# search_input = driver.find_element(By.NAME, "q")

# # Enter a search query
# search_input.send_keys("OpenAI")

# # Submit the search query
# search_input.send_keys(Keys.RETURN)

# # Wait for search results to load
# WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "search")))
classes_dict = {
    "RecipeCard": "Link_link__1AZfr RecipeGridCard_recipe__1Wo__ RecipeGridCard_recipe__tan__12uua",
}
# Get the page source
page_source = driver.page_source
    
# Parse the page source with Beautiful Soup
soup = BeautifulSoup(page_source, "html.parser")

recipe_links = soup.select('div.RecipesGrid_recipesGrid__results__CGnEX a')

# Iterate over each <a> element to extract sub-elements
for link in recipe_links:
    # Extracting attributes and text from each <a> element
    href = link['href']
    img_src = link.select_one('div.RecipeGridCard_recipe__img__1hv4j img')['srcoriginal']
    categories = link.select_one('p.RecipeGridCard_recipe__categories__3b5AM').text
    title = link.select_one('h3.RecipeGridCard_recipe__title__3-8S-').text

    # Print or process the extracted data as needed
    print("Recipe Title:", title)
    print("Category:", categories)
    print("Link:", href)
    print("Image Source:", img_src)
    print()
    
# # Find all search result titles
# search_results = soup.find_all("a", class_=classes_dict["RecipeCard"])

# # Print out search result titles
# for result in search_results:
#     print(result.text)
    
driver.quit()

