import React, { useState, useRef } from 'react';
import { Jumbotron, Container, Row, Col, Spinner } from 'reactstrap';
import ProductsTable from './components/ProductsTable';
import Form from './components/IdInputForm';
import ProductsNotFoundTable from './components/ProductsNotFoundTable';
import transformResponse from './utilities/transformResponse';
import filterFoundProducts from './utilities/filterFoundProducts';


function App() {

  const [productsFound, setProductsFound] = useState([]);
  const [productsNotFound, setProductsNotFound] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const entityIdsRef = useRef();

  const selectionChangeHandler = (event) => {
    const selection = event.target.id
    setSelectedEntityType(selection);
  }

  const formSubmissionHandler = (event) => {

    event.preventDefault();
    setProductsFound([]);
    setProductsNotFound([]);
    setIsLoading(true);
    const entityIdsEntry = entityIdsRef.current.value;
    const url = '/api/message?selectedEntityType=' + selectedEntityType + '&entityIds=[' + entityIdsEntry + ']';
    getData(url)
      .then(response => {
        console.log(response);
        const fetchedResults = transformResponse(response);
        console.log(fetchedResults);
        const filteredResults = filterFoundProducts(fetchedResults.productsFound, entityIdsEntry.split(","), selectedEntityType);
        console.log(filteredResults);
        setProductsFound(filteredResults);
        setProductsNotFound(fetchedResults.productsNotFound);
        setIsLoading(false);
      });

  }

  const getData = async (url) => {
    const rawResponse = await fetch(url);
    const response = await rawResponse.json();
    return response;
  }

  return (
    <Container>

      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">Product Explorer</h1>
            <p className="lead">Here you could search by different ids and get back results for the product associated with that id and the associated Commercial and Digital ids.</p>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={formSubmissionHandler} selectionChangeHandler={selectionChangeHandler} entityIdsRef={entityIdsRef} />
        </Col>
      </Row>


      {
        isLoading &&
        <Row>
          <Col />
          <Col> <Spinner color="primary" /></Col>
          <Col />
        </Row>
      }

      {
        (productsFound.length > 0) &&
        <Row>
          <Col>
            <ProductsTable data={productsFound}></ProductsTable>
          </Col>
        </Row>
      }
      {
        (productsNotFound.length > 0) &&
        <Row>
          <Col>
            <ProductsNotFoundTable data={productsNotFound}></ProductsNotFoundTable>
          </Col>
        </Row>
      }



    </Container>
  );

}

export default App;