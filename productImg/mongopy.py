from pymongo import MongoClient
from selenium import webdriver
import chromedriver_binary
from bs4 import BeautifulSoup
import urllib.request
import datetime
conn = MongoClient("mongodb+srv://pythonchampion187:66253EbcUMb4ZEY9@sgecommerce.wq5hfry.mongodb.net/")
db_sgecom = conn['test']
cl = db_sgecom['products']
driver = webdriver.Chrome()
driver.get('https://www.myntra.com/apparel?f=Brand%3AH%26M%2CNautica%2CUnited%20Colors%20of%20Benetton%3A%3ACategories%3AJeans%2CShirts%2CShorts%2CTrack%20Pants%2CTrousers%2CTshirts%3A%3AGender%3Amen%2Cmen%20women&rf=Price%3A399.0_5999.0_399.0%20TO%205999.0')
driver.get('https://www.myntra.com/womens-western-wear?f=Brand%3AH%26M&rf=Discount%20Range%3A10.0_100.0_10.0%20TO%20100.0')
content = driver.page_source
soup = BeautifulSoup(content)
# data = soup.find_all('div',attrs={'class' : 'product-productMetaInfo'})
# for d in data:
#     product_name = d.find('h3',attrs={'class':'product-brand'}).text + d.find('h4',attrs={'class':'product-product'}).text
#     product_price = d.find('div',attrs={'class':'product-price'})
    # dtl = cl.insert_one({'name':d['alt']})
    # urllib.request.urlretrieve(d['src'], f"{d['alt']}.jpeg")
    # mobile.append(d['src'])
details = []
data = soup.find_all('li',attrs={'class' : 'product-base'})
category_id = list(db_sgecom['categories'].find({'name':"Women's Wear"}))[0]['_id']
for i in data:
    x = 'https://www.myntra.com/' + i.find('a',attrs={'data-refreshpage':'true'})['href']
    d = webdriver.Chrome()
    d.get(x)
    c = d.page_source
    s = BeautifulSoup(c)
    
    name = s.find('h1',attrs={'class':'pdp-title'}).text + ' ' + s.find('h1',attrs={'class':'pdp-name'}).text
    detail = s.find('p',attrs={'class':'pdp-product-description-content'}).next.text
    price = eval(s.find('span',attrs={'class':'pdp-price'}).strong.text[1:] if '₹' in s.find('span',attrs={'class':'pdp-price'}).strong.text else s.find('span',attrs={'class':'pdp-price'}).strong.text.split('.')[1])
    # price = eval(s.find('span',attrs={'class':'pdp-price'}).strong.text.split('.')[1])
    # material = s.find_all('p',attrs={'class':'pdp-product-description-content'})[2].contents[0]
    ls_m = s.find_all('h4',attrs={'class':'pdp-sizeFitDescTitle'})
    fltrd_m = filter(lambda n : n.text=='Material & Care',ls_m)
    mat_tag = list(fltrd_m)[0]


    material = mat_tag.next.next.next.text
    img_div = s.find_all('div',attrs={'class':'image-grid-image'})
    primary_img = eval(img_div[0].attrs['style'].split('url(')[1][:-2])
    primary_image_text = f"primaryImage-{round(datetime.datetime.now().timestamp())}"
    urllib.request.urlretrieve(primary_img, f"{primary_image_text}.jpg")
    sec_img = eval(img_div[1].attrs['style'].split('url(')[1][:-2])
    sec_image_text = f"secondaryImage-{round(datetime.datetime.now().timestamp())}"
    urllib.request.urlretrieve(sec_img, f"{sec_image_text}.jpg")
    data_rec = {
        'name' : name,
        'category' : category_id,
        'price' : price,
        'description' : detail,
        'material' : material,
        'size_s' : 15,
        'size_m' : 15,
        'size_l' : 15,
        'size_xl' : 15,
        'primaryImage' : primary_image_text + '.jpg',
        'secondaryImage' : sec_image_text + '.jpg',
    }
    cl.insert_one(data_rec)
    details.append(data_rec)
print(details)    


# print(ls)