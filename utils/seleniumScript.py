import os
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service

from selenium.webdriver.common.by import By

import pandas as pd

''' CONSTANTS '''
CHROME_DRIVER_PATH = os.getcwd() + "/chromedriver"  # Path of chrome driver executable in project

CHROME_DRIVER_SERVICE = Service(CHROME_DRIVER_PATH)
OPTION = webdriver.ChromeOptions()

# SCRAPE_SITE_URL = 'https://jhu.campusgroups.com/events?from_date=15+Apr+2023&to_date=19+Apr+2023'  # Sai's test url
SCRAPE_SITE_URL = 'https://jhu.campusgroups.com/events?from_date=18+Apr+2023&to_date=19+Apr+2023'  # My test url

'''
TODO: create master dataframe based on these premises:

 1.) We've decided on what information to pull
    * Date (i.e from -> to)
    * Event image
    * Event organization
    * Details (i.e event description)
    * Num of registered
 2.) How to structure that data
    * With the master dataframe, define the columns needed
 3.) The commanality in not only the HTML elements but RSVP page url
    * URL breakdown...
        https://jhu.campusgroups.com/<ORGANIZATION NAME>/rsvp_boot?id=<UNKNOWN ID NUM>
        * What range is this id from?
        * How to generalize URL both on ORG NAME and the rsvp ID?
'''
df = pd.DataFrame(columns=['Event'])
print("Master dataframe (Before)\n: " + str(df))

driver = webdriver.Chrome(service=CHROME_DRIVER_SERVICE, options=OPTION)  # Driver object based on executable
driver.get(SCRAPE_SITE_URL)  # TODO: figure out how to handle authentication, if needed

time.sleep(7)  # TODO: figure out what this is for

# TODO: figure out what name to grab event names by
''' Pull event names from event page to RVSP '''
events = driver.find_elements(By.XPATH, value='//h3[@class="media-heading header-cg--h4"]')  # Try w/ XPath elements
# organizers = driver.find_elements(By.XPATH, value='//p[@class="rsvp__event-org"]')
print(events)
# print(organizers)

# Added organizer loop but doesn't put in array
# for i in range(len(organizers)):
#       print("Organizer loop to extract text running!")
#       currOrganizer = organizers[i].text
#       print("Organizer" + str(i) + " Text: " + currOrganizer)

events_list = []
for i in range(len(events)):
    print("Event loop to extract text running!")
    currEvent = events[i].text
    currEvent = currEvent[:-6]
    print("Event" + str(i) + " Text: " + currEvent)
    events_list.append(currEvent)  # TODO: figure out if .text is an attribute of a h# object

print("Event list: " + str(events_list))
print("Event: " + str(events_list[0]))
data_tuples = list(zip(events_list[0:]))

print("Data tuples: " + str(data_tuples))
temp_df = pd.DataFrame(data_tuples, columns=['Event'])

print("Temp df: " + str(temp_df) + "\n\n")

df = pd.concat([df, temp_df], ignore_index=True)

print("Master dataframe (After)\n: " + str(df) + "\n\n")

file_name = 'out.csv'
df.to_csv(file_name, encoding='utf-8', index=False)

driver.close()


''' SAI ADDITION OF DATES (Under construction) '''
# dates = driver.find_elements(By.XPATH,value='//td[@class=media-heading]')
#
# dates_list = []
# for i in range(len(dates)):
#     dates.append(dates[i].text)
#
# data_tuples = list(zip(events_list[1:],dates_list[1:]))
# temp_df = pd.DataFrame(data_tuples, columns=['Event','Date'])
# df = df.append(temp_df)
#
# file_name = 'out.csv'
# df.to_csv(file_name, encoding='utf-8', index=False)
#
# driver.close()



