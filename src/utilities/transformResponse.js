const transformResponse = response => {

    const productsFound = response
        .filter(product => product.productID)
        .map(product => mapProduct(product))
        .flat(3);
    const productsNotFound = response
        .filter(product => product.errorCode)
        .map(product => product.errorMessage)
    return {
        "productsFound": productsFound,
        "productsNotFound": productsNotFound
    };

}

const mapProduct = product => {
    return product.colourways.map(
        colourway => {
            return colourway.variants.map(
                variant => {
                    return {
                        productID: product.productID,
                        productCode: product.productCode,
                        productLastUpdatedDateTime: product.productLastUpdatedDateTime,
                        productStatus: product.productStatus,
                        publishStatus: product.publishStatus,
                        styleId: product.styleId,
                        legacyStyleID: product.legacyStyleID,
                        colourwayID: colourway.colourwayID,
                        retailOptionID: colourway.retailOptionID,
                        retailSKUID: variant.retailSKUID,
                        variantID: variant.variantID
                    }
                }
            )
        }
    )
}

export default transformResponse;