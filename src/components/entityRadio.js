import React from 'react';

const EntityRadio = (props) => {

    return (
        <div>
            <input type="radio" id={props.id} name={props.name} onChange={props.onChange} />
            <label htmlFor={props.id}>{props.id}</label>
        </div>
    );
}

export default EntityRadio;