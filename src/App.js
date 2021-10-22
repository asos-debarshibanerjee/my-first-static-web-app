import React, { useState, useRef } from 'react';
import DisplayTable from './components/DisplayTable';
import Form from './components/IdInputForm';


function App() {

  const [data, setData] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const entityIdsRef = useRef();

  const selectionChangeHandler = (event) => {
    const selection = event.target.id
    setSelectedEntityType(selection);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const entityIdsEntry = entityIdsRef.current.value;
    const url = '/api/message?selectedEntityType=' + selectedEntityType + '&entityIds=[' + entityIdsEntry + ']';
    getDataHandler(url);
  }

  const getDataHandler = async (url) => {
    const response = await fetch(url);
    const products = await response.json();
    setData(transformProducts(products));
  }

  const transformProducts = products => {
    const rows = products.map(
      product => {
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
    );    
    return rows.flat(3);
  }

  return (
    <React.Fragment>
      <Form onSubmit={formSubmissionHandler} selectionChangeHandler={selectionChangeHandler} entityIdsRef={entityIdsRef} />
      {(data) && <DisplayTable data={data}></DisplayTable>}
    </React.Fragment>
  );

}

export default App;