import requests

print(requests.post('http://127.0.0.1:5000/ai/',json = {'location':'Bangalore'}).text
      )