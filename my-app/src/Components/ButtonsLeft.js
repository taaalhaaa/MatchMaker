import React from 'react';
import './style.css';

const ButtonsLeft = ({ handleAddGroup, handleAddLevel }) => {
  return (
    <div className="buttons-left d-flex align-items-center">
      {/* Buttons for adding group and level */}
      <div className="buttons-container">
        <div className="mb-2">
          <button class="button-55" onClick={handleAddGroup} className="btn btn-primary">Add Group</button>
        </div>
        <div className="mb-2">
          <button class="button-55" onClick={handleAddLevel} className="btn btn-primary">Add Level</button>
        </div>  
      </div>
    </div>
  );
};


export default ButtonsLeft;
