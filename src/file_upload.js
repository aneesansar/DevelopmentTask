import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import your CSS for styling

//Alertbox to create alert when file is uploaded
function AlertPopup({ message, onClose }) {
  return (
    <div className="alert-popup">
      <div className="alert-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
}

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("csv_file", selectedFile);
      //API call to make POST request to Django Backend
      try {
        await axios.post("http://localhost:8000/api/upload_csv/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Set the success message, clear the selected file, and show the alert
        setAlertMessage("CSV file uploaded successfully");
        setSelectedFile(null);
        setShowAlert(true);
      } catch (error) {
        console.error("Error uploading CSV file:", error);
        // Handle and display the error in your UI
        setAlertMessage("Error uploading CSV file: " + error.message);
        setShowAlert(true);
      }
    } else {
      // Handle the case when no file is selected
      setAlertMessage("Please select a CSV file to upload");
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    // Refresh the page
    window.location.reload();
  };

  return (
    //UI elements from frontend
    <div>
      <h1>Upload Your Data to View</h1>
      <input
        className="input"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button className="button" onClick={handleUpload}>
        Upload CSV
      </button>
      {showAlert && <AlertPopup message={alertMessage} onClose={closeAlert} />}
    </div>
  );
}

export default FileUpload;
