import React from 'react';
import { Table } from 'reactstrap';
import "./ProductsTable.css";

const ProductsNotFoundTable = (props) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Products Not Found</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(
                        productNotFound => (
                            <tr key={productNotFound}>
                                <td>{productNotFound}</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </Table>
    )

}

export default ProductsNotFoundTable;