import React from 'react';
import EntityRadio from './entityRadio';

const EntityTypeChoices = (props) => {

    return (
        <React.Fragment>

            <fieldset>

                <legend>What are you looking for</legend>

                {
                    props.entityTypes.map(
                        entityType => (
                            <EntityRadio name={props.name} onChange={props.onChange} id={entityType} key={entityType}/>
                        )
                    )
                }


            </fieldset>

        </React.Fragment>
    );
}

export default EntityTypeChoices;