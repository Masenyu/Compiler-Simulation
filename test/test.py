from selenium import webdriver
import time

driver = webdriver.Firefox()
f_start_time = time.time();
driver.get("http://localhost:8088/#/index/lexical-analysis")
print("Firefox: ",end="")


button_start_participle= driver.find_element_by_css_selector(".el-button.el-button--primary")
button_start_participle.click()

button_auto_show= driver.find_element_by_css_selector(".el-button.el-button--primary.is-plain")
button_auto_show.click()

f_end_time = time.time()
Firefoxtime = f_end_time - f_start_time
print(str(Firefoxtime) + "ms")