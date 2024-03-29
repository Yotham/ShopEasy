from selenium import webdriver

# Path to GeckoDriver executable
geckodriver_path = '/usr/local/bin/geckodriver'

# Initialize Firefox WebDriver
driver = webdriver.Firefox(executable_path=geckodriver_path)

# Example usage: Open a webpage
url = "https://www.traderjoes.com/home/recipes"
driver.get(url)

# Close the browser
driver.quit()
