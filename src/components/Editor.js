import React from "react";
import { useState, useEffect, useContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import SC from "./SurveysComponent";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";

export default function Editor() {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
      setEmail(userx.email);

      if (typeof user != "undefined" && user != null) {
        try {
          const colRef = collection(db, userx.uid);
          const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const newTimes = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTimes(newTimes);
            setLoading(false);
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setUser(null);
      setEmail("");
    }
  });

  const createSurvey = (values) => {
    try {
      const ref = collection(db, user.uid);

      addDoc(ref, { title: values.title });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSurvey = async (id) => {
    try {
      await deleteDoc(doc(db, user.uid, id));
    } catch (error) {
      console.log(error);
    }
  };
  const updateSurvey = (updatedSurvey, user) => {
    const docRef = doc(db, user.uid, updatedSurvey.id);
    setDoc(docRef, updatedSurvey);
  };

  return (
    <Card padding="max(20px,20%)">
      {loading ? (
        <div
          style={{
            height: "50%",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1 style={{ display: "block" }}>Eigene Umfragen</h1>
          <SC
            user={user}
            data={times}
            createSurvey={createSurvey}
            deleteSurvey={deleteSurvey}
            updateSurvey={updateSurvey}
          />
        </>
      )}
    </Card>
  );
} //close main
