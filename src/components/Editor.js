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
  const initialFormStateSurvey = { id: null, title: "" };
  const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
      setEmail(userx.email);

      try {
        const colRef = collection(db, user.uid);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
          const newTimes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTimes(newTimes);
          setLoading(false);
        });
      } catch {
        console.log("no survey");
      }
    } else {
      setUser(null);
      setEmail("");
    }
  });

  const createSurvey = (values) => {
    const ref = collection(db, user.uid);
    console.log(values.title);
    addDoc(ref, { title: values.title });
    console.log("createSurvey  ");
  };
  const deleteSurvey = async (id) => {
    await deleteDoc(doc(db, user.uid, id));
  };
  const updateSurvey = (updatedSurvey) => {
    const docRef = doc(db, user.uid, updatedSurvey.id);
    setDoc(docRef, updatedSurvey);
  };
  useEffect(() => {}, [user]);

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
