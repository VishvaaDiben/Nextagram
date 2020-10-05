import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import UserImages from "../containers/UserImages";
import UserProfilePage from "./UserProfilePage";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);


  return (
    <div style={{     
      paddingTop: '60px'
    }}>
      {users.map((user) => (
        <div className="box">

          <div style={{ display: "grid",
              gridTemplateColumns: "auto",borderStyle: "ridge", padding: "2px", width: '100%' }}>
              <div
                style={{
                  // display: "grid",
                  // gridTemplateColumns: "auto",
                  // border: "2px solid gray",
                  // borderStyle: "ridge",
                  // padding: "15px 32px",
                }}
              >
                <h4> {user.username}</h4>
                <img className="circular--square" src={user.profileImage} />
                <Link to={"/users/" + user.id} >Show More</Link>
              </div>


            <UserImages userId={user.id} />
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default HomePage;
