import React from 'react';


import { useState, useEffect, useMemo , useContext, createContext} from 'react';
import {useParams} from "react-router-dom"

import {onSnapshot} from "firebase/firestore";

import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { CircularProgress } from '@mui/material';

import QC from "./QuestionComponent"
export const UserContext = createContext(null);

export default function Editor(props) {
  
  const { surveyId, creatorId } = useParams();
  
  const [user, setUser] = useState(props.user);
  // Setting state
  const [auth, setAuth] = useState(false); 
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const createQuestion = values => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    addDoc(colRef2, {text: values.text})
    console.log("createSurvey  ")
  }
  const deleteQuestion = async (id) => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, id)
    await deleteDoc(docRef2);
  }
  const updateQuestion = (updatedQ) => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, updatedQ.id)
    setDoc(docRef2, updatedQ);
  }

  useEffect(() => {
     
   
    setAuth(user.uid === creatorId)
    
    try{
      const colRef = collection(db, creatorId)     
      const docRef = doc(colRef, surveyId)
      const colRef2 = collection(docRef, "questions")
      
      const unsubscribe2 = onSnapshot(colRef2, snapshot => {
          const newTimes2 = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTimes(newTimes2);
          setIsLoading(false)
        });
      console.log("times", times)  
        } //try block ends
        catch{
            console.log("no survey")
        }
  }, [])

  return (
    <div style={{height: "80vh"}}> 
      { isLoading ?
        <div style={{height: "50%", width:"50px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress />
        </div>:
        <>
          {auth &&
            <>
              <UserContext.Provider value={user}>
                <QC creatorId={creatorId} surveyId= {surveyId}  data = {times} createQuestion={createQuestion} deleteQuestion = {deleteQuestion} updateQuestion = {updateQuestion}/> 
              </UserContext.Provider>
            </>}
        </>
      }
    </div>
    
  )
}//close main
