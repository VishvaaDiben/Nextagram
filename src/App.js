import "./App.css";

import { ToastContainer, toast } from "react-toastify";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import React from "react";
import { Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <Route exact path="/" component={HomePage} />
      <Route path="/users/:id" component={UserProfilePage} />
    </div>
  );
}

export default App;
