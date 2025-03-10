import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

const LogoutPg = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
    } else {
      setUser(null);
    }
  });

  const handleLogout = () => {
    signOut(auth)
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
