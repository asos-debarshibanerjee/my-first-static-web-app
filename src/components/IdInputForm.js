import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import EntityTypeChoices from './EntityTypeChoices';

const IdInputForm = (props) => {

  const entityChoiceName = "entityType"
  const entityTypes = ["Products", "Options", "Colourways", "SKUs", "Variants", "LegacyStyles"];

  return (

    <Form onSubmit={props.onSubmit} >


      <EntityTypeChoices entityTypes={entityTypes} name={entityChoiceName} onChange={props.selectionChangeHandler} />

      <FormGroup>
        <Label for="exampleText">Please enter the IDs</Label>
        <Input type="textarea" name="entityIds" id="entityIds" innerRef={props.entityIdsRef} />
      </FormGroup>



      <Button>Submit</Button>

    </Form>

  );

};

export default IdInputForm;