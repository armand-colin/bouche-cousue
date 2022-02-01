import requests
from html.parser import HTMLParser
from bs4 import BeautifulSoup
from request_boost import boosted_requests

defs_dict = dict()

for letter_ord in range(26):
    letter = chr(ord('a') + letter_ord)
    print(f"letter {letter}")
    i = 1
    text = None
    while True:
        try:
            text = requests.get(f"https://cruciverbe.fr/definitions-par-lettre/{letter}/{i}").text
        except:
            break
        print(f"page {i}")
        bs = BeautifulSoup(text)
        defs_list = bs.find('ul', attrs={'class': 'columns'})
        links = defs_list.find_all('a')

        urls = ["https://cruciverbe.fr" + link.attrs['href'] for link in links]
        results = boosted_requests(urls=urls, max_tries=20)

        # for result in results:
        #     print(result)
        #     break
        # for link in links:
        #     href = link.attrs['href']
        #     text = requests.get("https://cruciverbe.fr" + href).text
        #     bs = BeautifulSoup(text)
        #     definition = bs.find('em').text
        #     words = bs.find_all('span', attrs={'class': 'k'})
        #     for word in words:
        #         if not word in defs_dict:
        #             defs_dict[word] = []
        #         defs_dict[word] = definition
        i += 1
