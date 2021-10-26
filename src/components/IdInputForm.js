import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import EntityTypeChoices from './EntityTypeChoices';

const IdInputForm = (props) => {

  const entityChoiceName = "entityType"
  const entityTypes = ["Products", "Options", "Colourways", "SKUs", "Variants", "LegacyStyles"];

  return (
    <Container>


      <Form onSubmit={props.onSubmit} >

        <Row>
          <Col>
            <EntityTypeChoices entityTypes={entityTypes} name={entityChoiceName} onChange={props.selectionChangeHandler} />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleText">Please enter the IDs</Label>
              <Input type="textarea" name="entityIds" id="entityIds" innerRef={props.entityIdsRef} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>

  );

};

export default IdInputForm;