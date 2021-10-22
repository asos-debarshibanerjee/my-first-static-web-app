import requests, os

def getBaseUrl():
    return "https://dev-product-management-api-tgr.test.digcoreint.com"

def is_filtering_suppressed():
    return "true"

def get_bearer_token():
    post_obj = {
        'grant_type': 'client_credentials',
        'client_id': os.environ['AZURE_CLIENT_ID'],
        'client_secret': os.environ['AZURE_CLIENT_SECRET'],
        'resource': 'https://api.asos.com'
    }
    token_endpoint = 'https://login.microsoftonline.com/4af8322c-80ee-4819-a9ce-863d5afbea1c/oauth2/token'
    res = requests.post(token_endpoint, post_obj)
    # print(res.json()['access_token'])
    return res.json()['access_token']

def call_product_managment_endpoint(url):
    payload = {}
    headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + get_bearer_token(),
    }
    response = requests.request("GET", url , headers=headers, data=payload)
    return response

def get_from_product_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/products/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

def get_from_option_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/colourway/retailOptionID/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

def get_from_colourway_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/colourway/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

def get_from_sku_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/variant/retailskuid/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

def get_from_variant_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/variant/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

def get_from_legacy_style_id(optionId):
    url = getBaseUrl() + "/productmanagement/product/v1/styleId/legacyStyleId/" + optionId + "?suppressFiltering=" + is_filtering_suppressed()
    return call_product_managment_endpoint(url)

if __name__ == '__main__':
    print(get_from_option_id('100060571'))