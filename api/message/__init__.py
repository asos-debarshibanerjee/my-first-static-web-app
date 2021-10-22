import logging
import json

from requests.models import Response
from .productmanagement import get_from_option_id

import azure.functions as func


def getEntityIdsFromQueryParameter(entityIdsParam):
    entityIdsValue = entityIdsParam[1:-1]
    print(entityIdsValue)
    entityIds = entityIdsValue.split(',')
    return entityIds


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    selectedEntityType = req.params.get('selectedEntityType')
    print("Entered selectedEntityType: " + str(selectedEntityType))
    entityIdsParam = req.params.get('entityIds')
    print("Entered entityIds: " + str(entityIdsParam))
    entityIds = getEntityIdsFromQueryParameter(entityIdsParam)
    print(entityIds)
    productManagementCallables = {
        "Products": productmanagement.get_from_product_id , 
        "Options": productmanagement.get_from_option_id, 
        "Colourways": productmanagement.get_from_colourway_id, 
        "SKUs": productmanagement.get_from_sku_id, 
        "Variants": productmanagement.get_from_variant_id, 
        "LegacyStyles": productmanagement.get_from_legacy_style_id
    }

    responses = map(productManagementCallables[selectedEntityType], entityIds)
    products = list(map(lambda response: response.json(), responses))
    print(json.dumps(products))

    
    return func.HttpResponse(json.dumps(products))
