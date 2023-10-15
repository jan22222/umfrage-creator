import React from 'react';


import { useState, useEffect, useMemo, createContext } from 'react';
import {useParams} from "react-router-dom"

import {onSnapshot} from "firebase/firestore";

import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

import AC from "./AnswerComponent"

export default function Editor({user}) {

  const { surveyId, creatorId , questionId} = useParams();

  // Setting state
  const [questionText, setQuestionText] = useState("");
  const [times, setTimes] = useState([]);
  
  
  const createAnswer = values => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, questionId)
    const colRef3 = collection(docRef2, "answers")
    addDoc(colRef3, {answer: values.answer})
    console.log("createanswer  ")
  }
  const deleteAnswer = async (id) => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, questionId)
    const colRef3 = collection(docRef2, "answers")
    const docRef3 = doc(colRef3, id)
    await deleteDoc(docRef3);
  }
  const updateAnswer = (updatedA) => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, questionId)
    const colRef3 = collection(docRef2, "answers")
    const docRef3 = doc(colRef3, updatedA.id)
    setDoc(docRef3, updatedA);
  }

  useEffect(async () => {
        console.log("user id" , user.uid)
        console.log("creatorId", creatorId)
        console.log("surveyId", surveyId)
    
      const colRef = collection(db, creatorId)     
      const docRef = doc(colRef, surveyId)
      const colRef2 = collection(docRef, "questions")
      const docRef2 = doc(colRef2, questionId)
      const docSnap = await getDoc(docRef2);
      setQuestionText(docSnap.text)
      console.log(questionText)
      const colRef3 = collection(docRef2, "answers")
      const unsubscribe2 = onSnapshot(colRef3, snapshot => {
          const newTimes2 = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTimes(newTimes2);
          console.log(newTimes2)
        });
      console.log("times", times)  
      
  }, [])

  return (
    <>
     <AC user={user} questionText ={questionText} questionId = {questionId} creatorId={creatorId} surveyId= {surveyId}  data = {times} createAnswer={createAnswer} deleteAnswer = {deleteAnswer} updateAnswer = {updateAnswer}/> 

      <h2>
        User-ID: {!user ? "Not logged in." : user.id}
      </h2>
    </>
  )
}//close main
