import React from 'react';

const ButtonsBottom = ({ handleUpdateSortValue, handleUpdateLevelValue }) => {
  return (
    <div className="buttons-bottom d-flex justify-content-center align-items-end">
      {/* Buttons for updating sort value and level value */}
      <div className="buttons-container">
        <button onClick={handleUpdateSortValue} className="btn btn-success mr-2">Update Sort Value</button>
        <button onClick={handleUpdateLevelValue} className="btn btn-success">Update Level Value</button>
      </div>
      



<style>

</style>
    </div>
  );
};

export default ButtonsBottom;
