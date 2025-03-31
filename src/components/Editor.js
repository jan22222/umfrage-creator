import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import SC from "./SurveysComponent"
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { AuthContext } from "../AuthProvider";


export default function Editor() {

  
    const { createUser,
    user,
    userId,
    userDisplayName,
    userEmail,
    userPhotoURL,
    
    loginUser,
    logOut,
    isLoggedIn } = useContext(AuthContext);
  
  const initialFormStateSurvey = { id: null, title: "" };
  const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true)

  const createSurvey = values => {
     const ref = collection(db, user.uid)
     console.log(values.title)
     addDoc(ref, {title: values.title})
     console.log("createSurvey  ")
  }
  const deleteSurvey = async (id) => {
    await deleteDoc(doc(db, user.uid, id));
  }
  const updateSurvey = (updatedSurvey) => {
    const docRef = doc(db, user.uid, updatedSurvey.id)
    setDoc(docRef, updatedSurvey);
  }
  useEffect(() => {
      try{
        const colRef = collection(db, user.uid)
        const unsubscribe = onSnapshot(colRef, snapshot => {
            const newTimes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })
          );
            setTimes( newTimes);
            setLoading(false)
        });
      }catch{
          console.log("no survey")
      }
  }, [user])

  return (
     
      <SC user={user} data = {times} createSurvey={createSurvey} deleteSurvey = {deleteSurvey} updateSurvey = {updateSurvey}/> 
  )
}//close main