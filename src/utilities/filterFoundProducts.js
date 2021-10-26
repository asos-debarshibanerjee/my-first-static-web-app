const filterFoundProducts = (foundProducts, enteredEntities, entityType) => {
    const selectedIdType = {
        "Products": "productID",
        "Options": "retailOptionID",
        "Colourways": "colourwayID",
        "SKUs": "retailSKUID",
        "Variants": "variantID",
        "LegacyStyles": "legacyStyleID"
    }

    console.log(selectedIdType[entityType]);
    console.log(enteredEntities);

    return foundProducts.filter(
        product => enteredEntities.some(entity => entity === product[selectedIdType[entityType]].toString())
    );
}

export default filterFoundProducts;