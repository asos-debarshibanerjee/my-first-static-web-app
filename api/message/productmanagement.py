import requests, os

def get_bearer_token():
    post_obj = {
        'grant_type': 'client_credentials',
        'client_id': os.environ['AZURE_CLIENT_ID'],
        'client_secret': os.environ['AZURE_CLIENT_SECRET'],
        'resource': 'https://api.asos.com'
    }
    token_endpoint = 'https://login.microsoftonline.com/4af8322c-80ee-4819-a9ce-863d5afbea1c/oauth2/token'
    res = requests.post(token_endpoint, post_obj)
    print(res.json()['access_token'])
    return res.json()['access_token']


def get_from_optionId(optionId):
    url = "https://dev-product-management-api-tgr.test.digcoreint.com/productmanagement/product/v1/colourway/retailOptionID/"
    payload = {}
    headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + get_bearer_token(),
    }
    return requests.request("GET", url + optionId + "?suppressFiltering=true", headers=headers, data=payload)

if __name__ == '__main__':
    print(get_from_optionId('100060571'))