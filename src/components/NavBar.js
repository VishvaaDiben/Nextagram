import "react-toastify/dist/ReactToastify.css";

import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setNameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPasswordInput] = useState("");
  const [email, setEmailInput] = useState("");
  const [loggedIn, setLogin] = useState(localStorage.getItem("token"));

 const [currentUser, setCurrentUser] = useState(localStorage.getItem("loggedInUser"))

  const handleClose = () => setShow(false);
  const showSignUp = () => setShowLogin(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.auth_token);
        localStorage.setItem("loggedInUser", response.data.user.id)
        setLogin(localStorage.getItem("token"))
        setCurrentUser(response.data.user.id)
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .then(handleClose());
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setLogin(false);
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <>
      <div className="topnav">
        <Link to="/">
          <a>Home</a>
        </Link>

        {loggedIn ? (
          <>
            <Link to={"/users/" + currentUser}>My Profile</Link>
            <div onClick={handleLogout}>
            <Link>Logout</Link>
            </div>
          </>
        ) : (
          <div className="login" onClick={() => setShow(true)}>
            <a>Login</a>
          </div>
        )}
      </div>
      {show ? (
        <Modal
          centered
          show={show}
          onHide={handleClose}
        >
          <div>
            <h2 style={{ textAlign: "center" }}>
              {showLogin ? "Sign-In" : "Sign-Up"}
            </h2>
          </div>
          <Modal.Body>
            {showLogin ? (
              <form onSubmit={(e) => handleLogin(e)}>
                <label>Name:</label>

                <input
                  type="text"
                  onChange={(e) => setNameInput(e.target.value)}
                  value={username}
                />

                <label>Password:</label>

                <input
                  type="password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  value={password}
                />

                <input
                  disabled={!username || !password}
                  type="submit"
                  value="Submit"
                />

                <button onClick={showSignUp}>
                  No Account ?Click here to sign-Up.
                </button>
                <Button variant="secondary" onClick={handleClose}>
                  close
                </Button>
              </form>
            ) : (
              <form onSubmit={(e) => handleSignUp(e)}>
                <label>Name:</label>

                <input
                  type="text"
                  onChange={(e) => setNameInput(e.target.value)}
                  value={username}
                />

                <label>Email:</label>

                <input
                  type="text"
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={email}
                />

                <label>Password:</label>

                <input
                  type="password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  value={password}
                />

                <label>Confirm Password:</label>

                <input
                  type="password"
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  value={confirmPassword}
                />
                <input
                  disabled={
                    !username ||
                    !password ||
                    !email ||
                    password !== confirmPassword
                  }
                  type="submit"
                  value="Submit"
                />

                <button onClick={() => setShowLogin(true)}>Back</button>
              </form>
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
