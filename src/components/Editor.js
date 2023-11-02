import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {onSnapshot} from "firebase/firestore";
import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import SC from "./SurveysComponent"


export default function Editor({user}) {
  
  const initialFormStateSurvey = { id: null, title: "" };

  // Setting state

  const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
  const [times, setTimes] = useState([]);

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

       console.log("user id", user.uid)
      try{
        const colRef = collection(db, user.uid)
        const unsubscribe = onSnapshot(colRef, snapshot => {
            const newTimes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })
          );
            setTimes( newTimes);
        });
    
          
      } //try block ends
        catch{
              console.log("no survey")
        }
  }, [user])

  return (
    <>
      <SC user={user} data = {times} createSurvey={createSurvey} deleteSurvey = {deleteSurvey} updateSurvey = {updateSurvey}/> 

    </>
  )
}//close main
