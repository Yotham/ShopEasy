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
    inner = content.find(class_='mp-recipe-teaser__title')
    title = inner.find(class_= 'mp-recipe-teaser__title')
        # Find the <a> tag within the title element to get the href
    link = title.find('a')  # Adjusted to find the <a> tag
    href = link['href']  # Extract the href attribute
    print(title.text.strip())  # Print the title text
    print(href)  # Print the href attribute
    print('-----')

