import React from 'react';
import EntityRadio from './entityRadio';
import { FormGroup } from 'reactstrap'

const EntityTypeChoices = (props) => {

    return (
        <React.Fragment>

            <FormGroup tag="fieldset">
                <legend>What are you looking for</legend>
                {
                    props.entityTypes.map(
                        entityType => (
                            <EntityRadio name={props.name} onChange={props.onChange} id={entityType} key={entityType} />
                        )
                    )
                }
            </FormGroup>

        </React.Fragment>
    );
}

export default EntityTypeChoices;