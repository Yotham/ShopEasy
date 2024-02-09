import requests
from bs4 import BeautifulSoup

# URL of the page you want to scrape
url = 'https://www.myplate.gov/myplate-kitchen/recipes?items_per_page=100&sort_bef_combine=title_ASC&page=0'


# Fetch the content from the URL
response = requests.get(url)
webpage = response.content

# Create a BeautifulSoup object and specify the parser
soup = BeautifulSoup(webpage, 'html.parser')
#print(soup)

# Find the elements containing recipes - You need to update the selectors based on actual webpage structure
items = soup.findAll('div', class_='block block-system block-system-main-block')



# Within this container, find all elements with the class 'field-content'
field_contents = items[0].find_all(class_='field-content')
for content in field_contents:
    inner = content.find(class_='mp-recipe-teaser__main')
    print(inner.find(class_= 'field--name-title'))
    print('-----')



# Iterate over each element found and perform your desired operations
# for field_content in field_contents:
#     # Example: print the text within each 'field-content' element
#     print(field_content.text.strip())