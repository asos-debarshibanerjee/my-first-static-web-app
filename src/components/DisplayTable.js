import React from 'react';
import "./DisplayTable.css"

const DisplayTable = (props) => {
    const columnsInTable = [
        {"header": "Product ID", "nameInMap": "productID"},
        {"header": "Retail Style ID", "nameInMap": "styleId"},
        {"header": "Legacy Style ID", "nameInMap": "legacyStyleID"},
        {"header": "Colourway ID", "nameInMap": "colourwayID"},
        {"header": "Retail Option ID", "nameInMap": "retailOptionID"},
        {"header": "Variant ID", "nameInMap": "variantID"},
        {"header": "Retail SKU ID", "nameInMap": "retailSKUID"},

    ];

   

    const dataTable = props.data;
    const columns = Object.keys(dataTable[0]);
    return (
        <table>
            <thead>
                <tr>
                    {
                        columnsInTable.map(
                            column => <th key={column.header}>{column.header}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dataTable.map(
                        product => (
                            <tr key={product.retailSKUID}>
                                {columnsInTable.map(
                                    column => (
                                        <td key={product.retailSKUID + column}>{product[column.nameInMap]}</td>
                                    )
                                )}

                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )

}

export default DisplayTable;