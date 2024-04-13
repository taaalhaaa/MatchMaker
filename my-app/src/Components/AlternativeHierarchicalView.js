import React from 'react';
import './style.css';

const AlternativeHierarchicalView = ({ data }) => {
  const renderAlternativeTreeView = (data) => {
    return (
      <ul className="alternative-tree">
        {data.map((node, index) => (
          <li key={index}>
            <span>{node.name}</span>
            {node.children && renderAlternativeTreeView(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h4 className="text-center1">Alternative Hierarchical View</h4>
      <div className="alternative-hierarchical-view">
        {Array.isArray(data) && data.length > 0 ? (
          renderAlternativeTreeView(data)
        ) : (
          <p>No hierarchical data to display</p>
        )}
      </div>
    </div>
  );
};

export default AlternativeHierarchicalView;
