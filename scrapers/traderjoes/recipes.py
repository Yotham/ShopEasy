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
url = urljoin(base_url, "/home/recipes")
driver.get(url)

while True:
    # Wait for recipes to load
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
        print("Recipe Title:", title)
        print("Category:", categories)
        print("Link:", href)
        print("Image Source:", img_src)
        print()

    if len(recipe_links) > 0:
        print("Found", len(recipe_links), "recipes")

    for i in range(len(recipe_links)):
        driver.get(urljoin(base_url, recipe_links[i]['href']))
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
        for li in li_elements:
            print(li.text)
        
        print()
    
    
    # Check if there is a next page button
    next_button = driver.find_element(By.CSS_SELECTOR, 'button.Pagination_pagination__arrow_side_right__9YUGr')
    if next_button:
        next_button.click()  # Click the next page button
        # Wait for the next page to load
        WebDriverWait(driver, 20).until(EC.staleness_of(link))
    else:
        break  # Exit the loop if there are no more pages

    
driver.quit()

