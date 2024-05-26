import React, { useState, useEffect } from "react";
import { z } from "zod";
import { addCar } from "../services/car.service";
import UploadImage2 from "./UploadImage2";
import axios from "axios";
import "./RegistrationForm.css";
import { LuFileInput } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function AddCarForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [error, setError] = useState("");
  const [position1, setPosition1] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition1({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  console.log("Location is :", position1);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    let response;
    console.log(selectedFile)

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }


    // const carData = {};
    // carData.location = location1;

    const formData = new FormData();
    
    formData.append("file", selectedFile);
    formData.append("latitude", position1.latitude);
    formData.append("longitude", position1.longitude);
    
    await addCar(formData);
  
    navigate("/animals");
    resetForm();
    

  };

  const resetForm = () => {
    setImageLink("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {error && <div style={{
        fontWeight:"800",
        fontSize:"1.1rem",
      }}>{error}</div>} */}
      <div className="centralized">
        <div className="wrapper">
          <form name="frm"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Add Animal Image</h1>

            <div className="input-box">
              <UploadImage2
                imageLink={imageLink}
                setImageLink={setImageLink}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
              <LuFileInput className="icon" />
            </div>
            <button type="submit">Add Image</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCarForm;
