import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import * as XLSX from 'xlsx';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);

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
      {excelData && (
        <div className="file-details mt-4">
          <h4 className="text-center1">File Content</h4>
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
      )}
    </div>
  );
};

export default FileUploader;
