import React, { useEffect, useState } from "react";

import Comments from "./Comments"
import { Container } from "reactstrap";
import { Height } from "@material-ui/icons";
import Likes from "./Likes";
import Loader from "../components/Loader";
import axios from "axios";

const UserImages = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [moreImages, setMoreImages] = useState(false);
  // const [lessImages, setLessImages] = useState([]);

  useEffect(() => {
    fetchImages();
    // checkImagesLength();
  }, [userId]);

  // const checkImagesLength = () => {
  //   if (images.length > 10) {
  //     setLessImages(images.splice(0, 10));
  //     setMoreImages(true);
  //   }
  // };

  const fetchImages = () => {
    axios
      .get(`https://insta.nextacademy.com/api/v2/images/?userId=${userId}`)
      .then((result) => {
        setImages(result.data);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  // console.log(images.length)
  // console.log(moreImages.length)

  return (

    
    <div className="grid-container">
      {isLoading ? (
        <Loader />
      ) :  (
        images.map((image) => (
          <div>
            <img style={{ width: "100px", height: "100px" }} src={image} />
            {image.id}
            <Likes imageId={image.id} />
            <Comments imageId={image.id}/>
          </div>
        ))
      )}
    </div>
  );
};

export default UserImages;
