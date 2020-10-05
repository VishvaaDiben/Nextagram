import { Col, Container, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";

import UploadPage from "./UploadPage";
import UserImages from "../containers/UserImages";
import axios from "axios";

const UserProfilePage = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    if (id == "id" && !localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    axios
      .get("https://insta.nextacademy.com/api/v1/users/" + id, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setUser(result.data);
      });
  }, [id]);

  return (
    <Container style={{marginTop: '100px'}}>
      <Container >
        <Row>
          <Col>
            <img src={user.profileImage} width="200" />
          </Col>

          <Col>
            <p>
              <b>{user.username}</b>
            </p>
            <p>"Quotes"</p>
            <p>Hobbies</p>
            <p>Links</p>
            {user.id != userLoggedIn ? "" : <UploadPage />}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{user.id ? <UserImages userId={user.id} /> : null}</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfilePage;
