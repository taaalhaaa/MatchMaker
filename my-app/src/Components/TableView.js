import React from 'react';
import './style.css';
const TableView = ({ excelData }) => {
  // Implementation for table view
  return (
    <div>
      <h4 className="text-center1">Table View</h4>
      <table className="table-view">
        <tbody>
          {excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
