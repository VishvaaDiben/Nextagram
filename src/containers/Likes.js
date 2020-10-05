import React, { useEffect, useState } from "react";

import axios from "axios";

const Likes = ({ imageId }) => {
  const [likes, setLikes] = useState([]);//contains no. of likes
  const [liked, setLiked] = useState(false)//check if liked or not
  const [likesNum, setLikesNum] = useState(0)//set initial likes length to zero


  //Hence a way to make the likes work, the bearer allowed to like the other users images, except for itself
  


  useEffect(() => {
    console.log(imageId)
    axios
      .get(`https://insta.nextacademy.com/api/v2/images/${imageId}`, {
        headers: {
           Authorization: "Bearer " + 
           localStorage.getItem("token") 
          },
      })
      .then((response) => {
        console.log('get images data',response.data);
        setLikes(response.data.likes);
        setLiked(response.data.liked);
        setLikesNum(response.data.likes.length);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [imageId]);

  console.log(likes)

  const handleLike = () => {
    //POST not sending any data but need header.no data posted but needed to verify the header objects
    axios.post(`https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`, {}, {
headers: {
Authorization: "Bearer " +
localStorage.getItem("token") 
}
    }).then((response) => {
      setLiked(response.data.liked)
      setLikesNum(liked ? likesNum - 1 : likesNum + 1)
    })
  }

  return (<div style={{padding: "5%", display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap"}}>
  <h6>Likes : {likesNum}</h6>
  {
    liked ? <button onClick={()=>handleLike()}>Unlike</button> : <button onClick={()=>handleLike()}>Like</button>
  }
</div>)
};

export default Likes;
