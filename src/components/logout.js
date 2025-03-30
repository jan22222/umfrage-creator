import React, { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import  auth  from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../AuthProvider";
  

const LogoutPg = () => {
  const navigate = useNavigate();

  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then((res) => {
        navigate("../");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div>
        {typeof user != "undefined" && user != null ? (
          <Button variant="contained" size="large" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <div>You are not logged in.</div>
        )}
      </div>
    </>
  );
};

export default LogoutPg;
