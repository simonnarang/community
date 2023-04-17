from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pandas as pd
import time
from selenium.webdriver.common.by import By

df = pd.DataFrame(columns=['Event','Date'])
# chromedriver_linux64/
driver = webdriver.Chrome('/Users/Saidaman/Downloads/chromedriver')
driver.get('https://jhu.campusgroups.com/events?from_date=15+Apr+2023&to_date=19+Apr+2023')

time.sleep(7)
# events = driver.find_elements(By.XPATH,value='//h3[@class=header-cg--h4]')
events = driver.find_elements(By.xpath,"media-heading header-cg--h4")
print(events)

events_list = []
for i in range(len(events)):
    print("HERE")
    print(events[i].text)
    events_list.append(events[i].text)

dates = driver.find_elements(By.XPATH,value='//td[@class=media-heading]')

dates_list = []
for i in range(len(dates)):
    dates.append(dates[i].text)

data_tuples = list(zip(events_list[1:],dates_list[1:]))
temp_df = pd.DataFrame(data_tuples, columns=['Event','Date'])
df = df.append(temp_df)

file_name = 'out.csv'
df.to_csv(file_name, encoding='utf-8', index=False)

driver.close()