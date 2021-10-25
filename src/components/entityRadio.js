import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap'

const EntityRadio = (props) => {

    return (
            <FormGroup check>
                <Label check>
                    <Input type="radio" id={props.id} name={props.name} onChange={props.onChange} />{' '}
                    {props.id}
                </Label>
            </FormGroup>
    );
}

export default EntityRadio;