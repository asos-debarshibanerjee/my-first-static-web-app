import React, { useState, useRef } from 'react';
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
    console.log(selectedEntityType);
    console.log(entityIdsRef.current.value);
    const entityIdsEntry = entityIdsRef.current.value;
    const entityIds = entityIdsEntry.split(",")
    const url = '/api/message?selectedEntityType=' + selectedEntityType + '&entityIds=[' + entityIdsEntry + ']';
    console.log(url)
    getDataHandler(url);
  }

  const getDataHandler = async (url) => {
    const response = await fetch(url);
    console.log(response);
    const products = await response.json();
    console.log(products);
    let productIds = products[0].productID + ", " + products[1].productID;
    console.log(productIds);
    setData(productIds);
  }




  return (
    <React.Fragment>
      <Form onSubmit={formSubmissionHandler} selectionChangeHandler={selectionChangeHandler} entityIdsRef={entityIdsRef} />
      <p>{data}</p>
    </React.Fragment>
  );

}

export default App;