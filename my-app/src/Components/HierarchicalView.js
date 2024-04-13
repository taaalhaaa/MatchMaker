import React from 'react';
import './style.css';

const HierarchicalView = ({ preprocessedData, renderTreeNodes }) => {
  return (
    <div>
      <h4 className="text-center1">Hierarchical View</h4>
      <div className="hierarchical-view">
        {Array.isArray(preprocessedData) && preprocessedData.length > 0 ? (
          renderTreeNodes(preprocessedData)
        ) : (
          <p>No hierarchical data to display</p>
        )}
      </div>
    </div>
  );
};

export default HierarchicalView;
