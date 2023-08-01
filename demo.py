import selenium
from selenium import webdriver
from selenium.common.exceptions import WebDriverException, InvalidArgumentException, JavascriptException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import json
from bs4 import BeautifulSoup

def remove_tags(content):
    soup = BeautifulSoup(content, 'html.parser')
    text = soup.get_text()
    return text

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--user-data-dir=C://Users/pc/AppData/Local/Google/Chrome/User Data")
chrome_options.add_argument("--profile-directory=Profile 3")

driver = webdriver.Chrome(options=chrome_options)

time.sleep(2)

while True:
    try:
        driver.get("https://canvas.umn.edu/")
        break
    except WebDriverException as e:
        pass

username = "omar0259"
password = "Ahmedissa@123456789"
class_url = "https://canvas.umn.edu/courses/295642"
interesting_section_lists = ["Announcements", "Modules", "Pages", "Syllabus", "Assignments", "Discussions", "Quizzes"]
scrapped_data = {}


while True:
    try:
        username_input = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.ID, "username"))
        )

        driver.execute_script("arguments[0].value = '{}';".format(username), username_input)
        driver.execute_script("document.querySelector('#password').value = '{}'".format(password))

        button = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.NAME, "_eventId_proceed"))
        )

        context_modules = None
        section_tabs = None

        driver.execute_script("arguments[0].click()", button)

        time.sleep(10)

        # duo_iframe = driver.execute_script("return document.querySelector('#duo_iframe')")
        # driver.switch_to.frame(duo_iframe)

        # duo_document = driver.execute_script("return document")

        # html_element = driver.execute_script("return arguments[0].getElementsByTagName('html')[0]", duo_document)
        # driver.switch_to.frame(html_element)

        # time.sleep(2)

        # driver.execute_script("""document.querySelector('input[name="dampen_choice"]').click()""")
        # driver.execute_script("document.querySelector('button.positive.auth-button').click()")
        # driver.switch_to.default_content()

        driver.get(class_url)

        time.sleep(10)

        break

    except TimeoutException as e:
        pass

section_tabs = driver.execute_script("return document.querySelector('#section-tabs').getElementsByClassName('section')")

for section in section_tabs:

    section_name = driver.execute_script("return arguments[0].getElementsByTagName('a')[0].innerHTML.split('<')[0]", section)
    section_url = driver.execute_script("return arguments[0].getElementsByTagName('a')[0].href", section)

    if section_name in interesting_section_lists:
        scrapped_data[section_name] = {}
    else:
        continue        

    driver.execute_script("window.open();")
    driver.switch_to.window(driver.window_handles[1])
    WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))

    driver.get(section_url)

    if section_name == "Announcements":

        time.sleep(10)

        content = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "content"))
        )

        item_group = driver.execute_script("return arguments[0].firstChild.children[2].children", content)[1:]

        for item in item_group:

            item_name = driver.execute_script("return arguments[0].getElementsByClassName('ic-item-row__content-link-container')[0].firstChild.innerHTML", item)
            item_url = driver.execute_script("return arguments[0].getElementsByClassName('ic-item-row__content-link')[0].href", item)
            item_author = driver.execute_script("return arguments[0].getElementsByClassName('ic-item-row__author-col')[0].firstChild.getAttribute('name')", item)
            item_time = driver.execute_script("return arguments[0].getElementsByClassName('ic-item-row__meta-content-timestamp')[0].firstChild.innerHTML", item)

            driver.execute_script("window.open();")
            driver.switch_to.window(driver.window_handles[2])
            WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(3))

            driver.get(item_url)

            while True:
                try:
                    item_content = driver.execute_script("return document.querySelector('.message.user_content.enhanced').textContent.trim().replace(/\\n\\s+/g, '. ').replace(/\xa0/g, ' ')")
                    break
                except JavascriptException as e:
                    pass

            scrapped_data[section_name][item_name] = [item_url, item_author, item_time, item_content]

            driver.close()

            driver.switch_to.window(driver.window_handles[1])

    elif section_name == "Modules":
        
        context_modules = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "context_modules"))
        )

        item_group_container = driver.execute_script("return Array.from(arguments[0].children)", context_modules)

        for item_group in item_group_container:

            ig_header = driver.execute_script("return arguments[0].getElementsByTagName('div')[0]", item_group)

            item_group_name = driver.execute_script("return arguments[0].getElementsByClassName('name')[0].innerHTML", ig_header)
            scrapped_data[section_name][item_group_name] = {}

            item_group_content = driver.execute_script("return arguments[0].getElementsByClassName('content')[0].getElementsByTagName('ul')[0]", item_group)
            item_list = driver.execute_script("return arguments[0].getElementsByTagName('li')", item_group_content)

            indent_history = []
            indent_flag = False

            for item in item_list:

                try:
                    item_name = driver.execute_script("return arguments[0].getElementsByClassName('item_name')[0].getElementsByTagName('a')[0].textContent.trim().replace(/\\n\\s+/g, ' ')", item)
                    item_url = driver.execute_script("return arguments[0].getElementsByClassName('item_name')[0].getElementsByTagName('a')[0].href", item)
                    indent_flag = True
                    
                    driver.execute_script("window.open();")
                    driver.switch_to.window(driver.window_handles[2])
                    WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(3))

                    driver.get(item_url)
                    try:
                        item_content = remove_tags(driver.execute_script("return document.querySelector('#content').textContent.trim().replace(/\\n\\s+/g, '. ').replace(/\xa0/g, ' ')"))
                        current_url = driver.current_url

                        if len(indent_history) == 2:

                            if current_url != class_url:
                                scrapped_data[section_name][item_group_name][indent_history[0]][indent_history[1]][item_name] = [item_url, item_content]
                            else:
                                scrapped_data[section_name][item_group_name][indent_history[0]][indent_history[1]][item_name] = [item_url, "Couldn't find valid settings for this link"]

                        elif len(indent_history) == 1:

                            if current_url != class_url:
                                scrapped_data[section_name][item_group_name][indent_history[0]][item_name] = [item_url, item_content]
                            else:
                                scrapped_data[section_name][item_group_name][indent_history[0]][item_name] = [item_url, "Couldn't find valid settings for this link"]

                        else:

                            if current_url != class_url:
                                scrapped_data[section_name][item_group_name][item_name] = [item_url, item_content]
                            else:
                                scrapped_data[section_name][item_group_name][item_name] = [item_url, "Couldn't find valid settings for this link"]

                    except JavascriptException as e:
                        if len(indent_history) == 2:
                            scrapped_data[section_name][item_group_name][indent_history[0]][indent_history[1]][item_name] = [item_url, "Couldn't scrape content for this link"]
                        elif len(indent_history) == 1:
                            scrapped_data[section_name][item_group_name][indent_history[0]][item_name] = [item_url, "Couldn't scrape content for this link"]
                        else:
                            scrapped_data[section_name][item_group_name][item_name] = [item_url, "Couldn't scrape content for this link"]

                    driver.close()

                    driver.switch_to.window(driver.window_handles[1])

                except JavascriptException as e:
                    item_name = driver.execute_script("return arguments[0].getElementsByClassName('item_name')[0].getElementsByTagName('span')[0].textContent.trim().replace(/\\n\\s+/g, ' ')", item)
                    item_url = ""

                    if indent_flag and indent_history != []:
                        indent_history.pop(-1)

                    indent_flag = False
                    indent_history.append(item_name)

                    if len(indent_history) == 2:
                        scrapped_data[section_name][item_group_name][indent_history[0]][indent_history[1]] = {}
                    elif len(indent_history) == 1:
                        scrapped_data[section_name][item_group_name][indent_history[0]] = {}

    elif section_name == "Pages":
        pass
    elif section_name == "Syllabus":
        pass
    elif section_name == "Assignments":
        pass
    elif section_name == "Discussions":
        pass
    elif section_name == "Quizzes":
        pass

    driver.close()

    driver.switch_to.window(driver.window_handles[0])

with open('output.json', 'w') as file:
    json.dump(scrapped_data, file)