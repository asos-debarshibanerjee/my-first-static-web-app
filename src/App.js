import React, { useState, useRef } from 'react';
import DisplayTable from './components/DisplayTable';
import Form from './components/IdInputForm';
import { Jumbotron, Container, Row, Col, Spinner } from 'reactstrap';


function App() {

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const entityIdsRef = useRef();

  const selectionChangeHandler = (event) => {
    const selection = event.target.id
    setSelectedEntityType(selection);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setData("");
    const entityIdsEntry = entityIdsRef.current.value;
    console.log(entityIdsEntry)
    const url = '/api/message?selectedEntityType=' + selectedEntityType + '&entityIds=[' + entityIdsEntry + ']';
    getDataHandler(url);
  }

  const getDataHandler = async (url) => {
    setIsLoading(true);
    const response = await fetch(url);
    const products = await response.json();
    const dataForTable= transformProducts(products)
    console.log(dataForTable)
    setData(dataForTable);
    setIsLoading(false);
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

      <Row>
        <Col />
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
        (data) &&
        <Row>
          <Col>
            <DisplayTable data={data}></DisplayTable>
          </Col>
        </Row>
      }


    </Container>
  );

}

export default App;