import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import your custom CSS file
import * as XLSX from 'xlsx';
import ButtonsLeft from './ButtonsLeft';
import ButtonsBottom from './ButtonsBottom';
import HierarchicalView from './HierarchicalView';
import TableView from './TableView';

const FileInformationBar = ({ selectedFile }) => {
  return (
    <div className="file-information-bar">
      <div className="file-info">
       <i class="bi bi-file-earmark-excel-fill"></i>
        <div className="file-details2">
          <span className="file-name">File Selected: {selectedFile.name}</span>
          <span className="file-size">File Size: {(selectedFile.size / 1024).toFixed(2)} KB</span>
          
        </div>
      </div>
    </div>
  );
};

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [isTreeView, setIsTreeView] = useState(true); // State to manage view mode
  const [preprocessedData, setPreprocessedData] = useState(null);
  const [dragZoneVisible, setDragZoneVisible] = useState(true);

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
      setDragZoneVisible(false); // Hide drag zone after file selection
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
    if (!Array.isArray(data)) {
      return null; // or handle appropriately
    }

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

  const handleAddGroup = () => {
    // Implement logic to add a group
  };

  const handleAddLevel = () => {
    // Implement logic to add a level
  };

  const handleUpdateSortValue = () => {
    // Implement logic to update sort value
  };

  const handleUpdateLevelValue = () => {
    // Implement logic to update level value
  };

  return (
    <div className="file-uploader-container">
      <h2 className="text-center mb-4 big-heading">
        <span className="blue-text">See or Make Your Own File Hierarchy!</span>
      </h2>
      {dragZoneVisible && (
        <div className="drop-zone" onDrop={handleFileSelect} onDragOver={(event) => event.preventDefault()}>
          <p className="text-center">
            <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
            Drag and drop your file here
            <br />
            or
            <br />
            <button className="upload-button" onClick={handleButtonClick}>
              Click to browse
            </button>
            <br/>
            <input
              type="file"
              id="fileInput"  // Ensure this ID is present
              onChange={handleFileSelect}
              className="file-input"
              accept=".xlsx, .xls, .csv, .db"
            />
          </p>
        </div>
      )}
      {selectedFile && <FileInformationBar selectedFile={selectedFile} />} {/* Render file information bar if file is selected */}
      {selectedFile && (
        <div className="row-center">
          <ButtonsLeft handleAddGroup={handleAddGroup} handleAddLevel={handleAddLevel} />
          {excelData && preprocessedData && (
            <div className="file-details">
              <div className="view-toggle">
                <button onClick={toggleView} className="toggle-button">
                  {isTreeView ? 'Switch to Table View' : 'Switch to Hierarchical View'}
                </button>
                
              </div>
              {isTreeView ? (
                <HierarchicalView preprocessedData={preprocessedData} renderTreeNodes={renderTreeNodes} />
              ) : (
                <TableView excelData={excelData} />
              )}
            </div>
          )}
          {excelData && preprocessedData && (
            <div className="file-details">
              <div className="view-toggle">
                <button onClick={toggleView} className="toggle-button">
                  {isTreeView ? 'Switch to Table View' : 'Switch to Hierarchical View'}
                </button>
                
              </div>
              {isTreeView ? (
                <HierarchicalView preprocessedData={preprocessedData} renderTreeNodes={renderTreeNodes} />
              ) : (
                <TableView excelData={excelData} />
              )}
            </div>
          )}
        </div>
      )}
      {selectedFile && <ButtonsBottom handleUpdateSortValue={handleUpdateSortValue} handleUpdateLevelValue={handleUpdateLevelValue} />}
    </div>
  );
};

export default FileUploader;
