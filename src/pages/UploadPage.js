import { Button, Form, FormGroup, FormText, Modal } from "react-bootstrap";
import React, { useState } from "react";

import axios from "axios";

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [show, setShowModal] = useState(false);

  const selectImages = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = (e) => {
    console.log("Uploading Image...");
    e.preventDefault();
    let JWT = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${JWT}` },
      })
      .then((response) => {
        if (response.data) {
          setMessage("Image Uploaded Successfully!");
          setPreviewImage(null);
          setImageFile(null);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const openModal = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <button onClick={openModal}>Post Image</button>
      {show ? (
         <>
            <form onSubmit={uploadImage}>
              
                <input type="file" name="image-file" onChange={selectImages} />
               
                  Make sure the image being uploaded is a supported format.
               
              <button
                disabled={!imageFile}
                onSubmit={uploadImage}
                type="submit"
                color="primary"
              >
                Upload
              </button>
            </form>
            <div className="card">
              {previewImage ? (
                <img src={previewImage} width="100%" height="100%" />
              ) : (
                <h3 className="text-center">
                  {message ? message : "Live Preview"}
                </h3>
              )}
            </div>
            </>
      ) : (
        ""
      )}
    </>
  );
};

export default UploadPage;
