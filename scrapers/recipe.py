import requests
from bs4 import BeautifulSoup
import json
# URL of the page you want to scrape


storage = {}
for i in range(11):
    url = f'https://www.myplate.gov/myplate-kitchen/recipes?items_per_page=100&sort_bef_combine=title_ASC&page={i}'
    print(url)
    print(i)
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
            # Find the <a> tag within the title element to get the href
        link = inner.find('a')  # Adjusted to find the <a> tag
        href = link['href']  # Extract the href attribute
        title = inner.text.strip()  # Print the title text
        storage[title] = {}
        link = 'https://www.myplate.gov'+href
        storage[title]['link'] = link
        #print(link)  # Print the href attribute
        response = requests.get(link)
        webpage = response.content

        # Create a BeautifulSoup object and specify the parser
        soup = BeautifulSoup(webpage, 'html.parser')
       # print(soup)
        ingredients = soup.find(class_='field--name-field-ingredients')
        #print(ingredients)
        items = ingredients.findAll(class_="field__item")
        storage[title]['ingredients'] = []
        for item in items:
            ingredient = ' '.join(item.text.split())
            storage[title]['ingredients'].append(ingredient)
        
        notesSoup = soup.find(class_ = "field--name-field-notes")
        if notesSoup:
            notes = notesSoup.find(class_='field__item').text.strip()
            #print(notes.text.strip())
            storage[title]['notes'] = notes

        makes = soup.find(class_="mp-recipe-full__detail--yield").text.split()
        if makes:
            storage[title]['numServings'] = int(makes[1])
        else:
            storage[title]['numServings'] = 'N/A'

        directions = soup.find(class_="field--name-field-instructions")
        steps = directions.findAll('div',class_="field__item")[0].find('ol').findAll('li')
        k = 1
        storage[title]['directions'] = {}
    
        for step in steps:
            storage[title]['directions'][f'{k}'] = step.text.strip()
            k+=1

        nutrition = soup.find(class_='mp-recipe-full__nutrition-wrapper').find(class_ = 'mp-recipe-full__nutrition-form').find(class_ = 'responsive-enabled usa-table').find('tbody')


        totalCalories = nutrition.find(class_ = 'total_calories').findAll('td')
        storage[title]['nutrition'] = {}
        storage[title]['nutrition'][totalCalories[0].text.strip()] = f"{int(totalCalories[1].text.strip())*storage[title]['numServings']}"

        totalFat = nutrition.find(class_ = 'total_fat').findAll('td')
        storage[title]['nutrition'][totalFat[0].text.strip()] = f"{int(totalFat[1].text.split()[0])*storage[title]['numServings']} {totalFat[1].text.split()[1]}"
        
        totalCarbs = nutrition.find(class_ = 'carbohydrates').findAll('td')
        storage[title]['nutrition'][totalCarbs[0].text.strip()] = f"{int(totalCarbs[1].text.split()[0])*storage[title]['numServings']} {totalCarbs[1].text.split()[1]}"
        

        totalProtein = nutrition.find(class_ = 'protein').findAll('td')
        storage[title]['nutrition'][totalProtein[0].text.strip()] = f"{int(totalProtein[1].text.split()[0])*storage[title]['numServings']} {totalProtein[1].text.split()[1]}"
        #print('-----')


print(json.dumps(storage, indent=4))

