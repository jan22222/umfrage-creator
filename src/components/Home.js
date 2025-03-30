import react, { useState } from "react";
import { onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import  auth  from "../firebase";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";



export default function Home() {




    const { createUser,
    user,
    userId,
    userDisplayName,
    userEmail,
    userPhotoURL,
    
    loginUser,
    logOut,
    loading,
    isLoggedIn } = useContext(AuthContext);

  const [invitations, setInvitations] = react.useState([]);

 


  function loadInvitations(user) {
 

    const colRef = collection(db, "Invitations " + user.email);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const newTimes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitations(newTimes);

      //add a watched field to each doc
      const data = {
        watched: true,
      };
      invitations.map((inv) => {
        let docRef = doc(colRef, inv.id);
        updateDoc(docRef, data);
      });
    });
    return null;
  }

  react.useEffect(() => {
    //
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {

      loadInvitations(user);
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <Card padding="max(20px,20%)">
          <h1>Invitations:</h1>
          {invitations.length === 0 ? (
            <h1>empty</h1>
          ) : (
            invitations.map(function (data, index) {
              return (
                <a href={data.link} style={{ textDecoration: "none" }}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea sx={{ width: "100%" }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {index + 1}. Einladung zur Umfrage "{data.title}"
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <p>Erstellt von {data.creatoremail}.</p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              );
            })
          )}
        </Card>
      ) : (
        <>Sie sind ausgeloggt.</>
      )}
    </>
  );
}
