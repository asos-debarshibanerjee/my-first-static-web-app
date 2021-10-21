import logging
import json

from requests.models import Response
from .productmanagement import get_from_optionId

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    selectedEntityType = req.params.get('selectedEntityType')
    print("Entered selectedEntityType: " + str(selectedEntityType))
    entityIds = req.params.get('entityIds')
    print("Entered entityIds: " + str(entityIds))
    
    logging.info('Python HTTP trigger function processed a request.')
    products = []
    product = productmanagement.get_from_optionId('100060807')
    productJson = product.json()
    products.append(productJson)
    product = productmanagement.get_from_optionId('100109732')
    productJson = product.json()
    products.append(productJson)
    return func.HttpResponse(json.dumps(products))
