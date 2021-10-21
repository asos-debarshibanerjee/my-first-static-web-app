import React from 'react';

import EntityTypeChoices from './EntityTypeChoices';

const IdInputForm = (props) => {

  
  const entityChoiceName = "entityType"
  const entityTypes = ["Products", "Options", "SKUs", "Colourways"];
  
 

  

  return (

    <form onSubmit={props.onSubmit} >
      <div className='form-control'>

        <EntityTypeChoices entityTypes={entityTypes} name={entityChoiceName} onChange={props.selectionChangeHandler}/>

        <div>
          <textarea id="entityIds" name="entityIds" rows="4" cols="100" ref={props.entityIdsRef}/>
        </div>

      </div>

      <div className="form-actions">
        <button>Search</button>
      </div>

    </form>

  );

};

export default IdInputForm;