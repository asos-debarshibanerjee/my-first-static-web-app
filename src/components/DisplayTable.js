import React from 'react';
import "./DisplayTable.css"

const DisplayTable = (props) => {

    const dataTable = props.data;
    const columns = Object.keys(dataTable[0]);
    return (
        <table>
            <thead>
                <tr>
                    {
                        columns.map(
                            column =>
                            (

                                <th key={column}>{column}</th>
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dataTable.map(
                        product => (
                            <tr key={product.retailSKUID}>
                                {columns.map(
                                    column => (
                                        <td key={product.retailSKUID + column}>{product[column]}</td>
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