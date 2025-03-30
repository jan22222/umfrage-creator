import React from "react";

import { useState, useEffect, useMemo, useContext, createContext } from "react";
import { useParams } from "react-router-dom";

import { onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import  auth  from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { CircularProgress, Card } from "@mui/material";

import QC from "./QuestionComponent";
export const UserContext = createContext(null);

export default function Editor(props) {
  const { surveyId, creatorId } = useParams();
  const [authx, setAuthx] = useState(false);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  // Setting state
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
      setEmail(userx.email);
      setAuthx(userx.uid === creatorId);

      try {
        const colRef = collection(db, creatorId);
        const docRef = doc(colRef, surveyId);
        const colRef2 = collection(docRef, "questions");

        const unsubscribe2 = onSnapshot(colRef2, (snapshot) => {
          const newTimes2 = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTimes(newTimes2);
          setIsLoading(false);
        });
        console.log("times", times);
      } catch {
        //try block ends
        console.log("no survey");
      }
    } else {
      setUser(null);
      setEmail("");
      setAuthx(false);
    }
  });

  const createQuestion = (values) => {
    const colRef = collection(db, creatorId);
    const docRef = doc(colRef, surveyId);
    const colRef2 = collection(docRef, "questions");
    addDoc(colRef2, { text: values.text });
    console.log("createSurvey  ");
  };
  const deleteQuestion = async (id) => {
    const colRef = collection(db, creatorId);
    const docRef = doc(colRef, surveyId);
    const colRef2 = collection(docRef, "questions");
    const docRef2 = doc(colRef2, id);
    await deleteDoc(docRef2);
  };
  const updateQuestion = (updatedQ) => {
    const colRef = collection(db, creatorId);
    const docRef = doc(colRef, surveyId);
    const colRef2 = collection(docRef, "questions");
    const docRef2 = doc(colRef2, updatedQ.id);
    setDoc(docRef2, updatedQ);
  };

  useEffect(() => {}, []);

  return (
    <Card padding="max(20px,20%)">
      {isLoading ? (
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
          {authx && (
            <>
              <QC
                creatorId={creatorId}
                surveyId={surveyId}
                data={times}
                createQuestion={createQuestion}
                deleteQuestion={deleteQuestion}
                updateQuestion={updateQuestion}
              />
            </>
          )}
        </>
      )}
    </Card>
  );
} //close main
