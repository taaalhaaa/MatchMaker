import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import * as XLSX from 'xlsx';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [isTreeView, setIsTreeView] = useState(true); // State to manage view mode
  const [preprocessedData, setPreprocessedData] = useState(null);

  useEffect(() => {
    if (excelData) {
      const processedData = preprocessExcelData(excelData);
      setPreprocessedData(processedData);
    }
  }, [excelData]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        readExcel(file);
      } else if (file.name.endsWith('.csv')) {
        readCSV(file);
      } else if (file.name.endsWith('.db')) {
        // Handle database file
        alert('Database file selected');
      } else {
        // Handle unsupported file type
        alert('Unsupported file type');
      }
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        readExcel(file);
      } else if (file.name.endsWith('.csv')) {
        readCSV(file);
      } else if (file.name.endsWith('.db')) {
        // Handle database file
        alert('Database file selected');
      } else {
        // Handle unsupported file type
        alert('Unsupported file type');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const readCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const jsonData = text.split('\n').map((line) => line.split(','));
      setExcelData(jsonData);
    };
    reader.readAsText(file);
  };

  const toggleView = () => {
    setIsTreeView(!isTreeView);
  };

  const preprocessExcelData = (excelData) => {
    // Assuming the first column represents the hierarchy
    const hierarchicalData = [];
    let currentHierarchy = [];

    excelData.forEach((row) => {
      // Check if the first cell is empty
      if (row[0] !== '') {
        // Add this row to the current hierarchy level
        currentHierarchy.push(row);
      } else {
        // Start a new hierarchy level
        hierarchicalData.push(currentHierarchy);
        currentHierarchy = [row];
      }
    });

    // Push the last hierarchy level
    hierarchicalData.push(currentHierarchy);

    return hierarchicalData;
  };

  const renderTreeNodes = (data) => {
    return (
      <ul className="tree">
        {data.map((node, index) => (
          <li key={index}>
            <span>{node[0]}</span>
            {node.length > 1 && renderTreeNodes(node.slice(1))}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="file-uploader-container">
      <h2 className="text-center mb-4 big-heading">
        <span className="blue-text">See or Make Your Own File Hierarchy!</span>
      </h2>
      <div
        className="drop-zone"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-center">
          <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
          Drag and drop your file here
          <br />
          or
          <br />
          <button className="upload-button" onClick={handleButtonClick}>
            Click to browse
          </button>
          <br />

          <input
            type="file"
            id="fileInput"
            onChange={handleFileSelect}
            className="file-input"
            accept=".xlsx, .xls, .csv, .db"
          />
        </p>
      </div>
      {excelData && preprocessedData && (
        <div className="file-details mt-4">
          <div className="view-toggle">
            <button onClick={toggleView} className="toggle-button">
              {isTreeView ? 'Switch to Table View' : 'Switch to Hierarchical View'}
            </button>
          </div>
          {isTreeView ? (
            <div>
              <h4 className="text-center1">Hierarchical View</h4>
              {Array.isArray(preprocessedData) && preprocessedData.length > 0 ? (
                renderTreeNodes(preprocessedData)
              ) : (
                <p>No hierarchical data to display</p>
              )}
            </div>
          ) : (
            <TableView excelData={excelData} />
          )}
        </div>
      )}


    </div>
  );
};

const TableView = ({ excelData }) => {
  // Implementation for table view
  return (
    <div>
      <h4 className="text-center1">Table View</h4>
      <ul className="list-group">
        {excelData.map((row, rowIndex) => (
          <li key={rowIndex} className="list-group-item">
            {row.map((cell, cellIndex) => (
              <span key={cellIndex}>{cell}</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
