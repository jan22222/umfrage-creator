import React from 'react';

import AddAnswer from "./AddAnswer"
import AddSurvey from './AddSurvey'
import AddQuestion from './AddQuestion';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {onSnapshot} from "firebase/firestore";

import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import VoteCard from './voteCard';
import SC from "./SurveysComponent"

export default function Editor({user}) {


  const initialFormStateSurvey = { id: null, title: "" };
  const initialFormStateSurveys = [{ id: null, title: "" }];
  const initialFormStateQuestion = { id: null, text: "" };
  const initialFormStateQuestions = [{ id: null, text: "" }];
  const initialFormStateAnswer = { id: null, answer: "" };
  const initialFormStateAnswers = [{ id: null, answer: "" }];
  // Setting state

  const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
  const [surveys, setSurveys] = useState(initialFormStateSurveys);
  const [questions, setQuestions] = useState(initialFormStateQuestions);
  const [answers, setAnswers] = useState(initialFormStateAnswers);
  const [editingSurvey, setEditingSurvey] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(initialFormStateQuestion);
  const [editingQuestion, setEditingQuestion] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(initialFormStateAnswer);
  const [editingAnswer, setEditingAnswer] = useState(false);
  const [times, setTimes] = useState([]);
  const [times2, setTimes2] = useState([]);
  const [times3, setTimes3] = useState([]);
  const [questionAnswersArray, setQuestionAnswersArray] = useState([])
  const createAnswer = answer => {
    console.log("user id ", user.uid, "curr surv id ", currentSurvey.id)
    const docRef = doc(db, user.uid, currentSurvey.id)
    console.log("step1")
    const colRef = collection(docRef, "questions")
    console.log("step2")
    console.log(currentQuestion.id)
    const docRef2 = doc(colRef, currentQuestion.id)
    console.log("step3")
    const colRef2 = collection(docRef2, "answers")
    console.log("step4")
    addDoc(colRef2, {answer})
    console.log("step5")

 }

  const createQuestion = question => {
    console.log("addQuestion called")
    console.log("Survey is ",currentSurvey.title)
    console.log("question is ", question)
    const docRef = doc(db, user.uid, currentSurvey.id)
    const colRef = collection(docRef, "questions")
    addDoc(colRef, {text : question})
 }

  const createSurvey = title => {
     const ref = collection(db, user.uid)
     console.log(title)
     addDoc(ref, {title})
     console.log("addSurvey rendered")
  }

  const editSurveyRow = (survey)=>{
    console.log("call of editSurveyRow ")
    setEditingSurvey(true);
    console.log("setEditingSurvey(true);")
    setCurrentSurvey({ id: survey.id, name: survey.name });
    console.log("set CurrentSurvey")
    console.log(currentSurvey)
  }
  const editQuestionRow = (question)=>{
    setEditingQuestion(true);
    setCurrentQuestion({ id: question.id, text: question.text});
  }
  const editAnswerRow = (answer)=>{
    setEditingAnswer(true);
    setCurrentAnswer({ id: answer.id, text: answer.text });
  }


  const deleteAnswer = async (id) => {
    try{
      setEditingAnswer(false);
      console.log("id of answer", id)
        const ref = doc(db, user.uid, currentSurvey.id)
        const colRef = collection(ref, "questions")
        const docRef = doc(colRef, currentQuestion.id)
        const colRef2 = collection(docRef, "answers")
        const docRef3 = doc(colRef2, id)
        console.log("deleting doc:" , docRef3.id)
        await deleteDoc(docRef3).then(
            ()=> {
                console.log("success deleting answer doc")

            }
        ).err(()=>{console.log("deleting did not work 1")})

    }catch{
        console.log("deleting did not work till now...")
    }
  }

  const deleteQuestion = async(id) => {

      setEditingQuestion(false);
      console.log(id)
        const ref = doc(db, user.uid, currentSurvey.id)
        const colRef = collection(ref, "questions")
        const docRef = doc(colRef, id)
        const colRef2 = collection(docRef, "answers")
        const docArr = []
        try {
            const docsSnap = await getDocs(colRef2);
            if(docsSnap.docs.length > 0) {
                docsSnap.forEach(doc => {
                    docArr.push(doc.id)
                 })
            }
        } catch (error) {
            console.log(error);
        }
        
        console.log(docArr)
        const docArr2 = docArr.map(id => doc(colRef2, id))
        const resolvedPromise = Promise.all(docArr2.map(doc => deleteDoc(doc)))
        
    }


  const deleteSurvey = async (id) => {
    console.log("call of deleteSurvey", id)
    setEditingSurvey(false);
    await deleteDoc(doc(db, user.uid, id));
    
  }
  const updateSurvey = (updatedSurvey) => {
    setEditingSurvey(false);
    console.log(updatedSurvey)
    const docRef = doc(db, user.uid, updatedSurvey.id)
    setDoc(docRef, updatedSurvey);
  }
  const updateQuestion = (updatedQuestion) => {
    setEditingQuestion(false);
    const docRef = doc(db, "test", currentSurvey.id)
    const colRef = collection(docRef, "questions")
    const docRef2 = doc(colRef, updatedQuestion.id)
    setDoc(docRef2, updatedQuestion);
  }
  const updateAnswer = (updatedAnswer) => {
    setEditingAnswer(false);
    const docRef = doc(db, "test", currentSurvey)
    const colRef = collection(docRef, "questions")
    const docRef2 = doc(colRef, currentQuestion.id)
    const colRef2 = collection(docRef2, "answers")
    const docRef3 = doc(colRef2, currentAnswer.id)
    setDoc(docRef3, updatedAnswer);
  }

  const Klick = (survey) => {
    setCurrentSurvey(survey)
  }

  const KlickQuestion = (question) => {
    setCurrentQuestion(question)
  }


    useEffect(() => {
        console.log("user id" , user.uid)
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
        
          const docRef = doc(colRef, currentSurvey.id)
          const colRef2 = collection(docRef, "questions")
          const unsubscribe2 = onSnapshot(colRef2, snapshot => {
              const newTimes2 = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setTimes2(newTimes2);
              setQuestions(newTimes2)
            });
            
          console.log("questions", questions)
            setQuestionAnswersArray([])
            questions.map((q, index)=>{
              console.log("Durchgang", index+1)
              const docRef2 = doc(colRef2, q.id)
              const colRef3 = collection(docRef2, "answers")
              const unsubscribe3 = onSnapshot(colRef3, snapshot => {

              const newTimes3 = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              
              console.log("question id", q.id)
              console.log("answers", newTimes3)
              const qaCombo = {questionId: q.id, answers: newTimes3}
              console.log(qaCombo)
              setQuestionAnswersArray(current => [...current, qaCombo]);
              console.log("questionAnswersArray", questionAnswersArray)

            }); 
          })
         
        } //try block ends
        catch{
            console.log("no survey")
        }
    }, [currentSurvey,currentQuestion])

  return (
    <>
    <SC data = {times} deleteSurvey = {deleteSurvey} updateSurvey = {updateSurvey}/> 
    <h2>
      User-ID: {!user ? "Not logged in." : user.id}
    </h2>
    <h1>Current Survey {currentSurvey.title} <div>
        <p>Go to survey </p>
       
        <a href={"/survey/"+user.uid+"/"+currentSurvey.id}>{currentSurvey.title}</a>
        <ul>{times.length > 0 ? (
          times.map(item => (
            <li key={item.id}>{item.title}
              <button
              onClick={() => Klick(item)}

              >
                Pick
              </button>
            </li>

          ))

          ):<li>empty</li>
          }

        </ul>
      </div></h1>
      <AddSurvey
        createSurvey = {createSurvey}
      />
      {/* <h1>Questions {currentQuestion.text} <div>
        <ul>{times2.length > 0 ? (
          times2.map(item => (
            <li key={item.id}>{item.text}
            <button
            onClick={() => KlickQuestion(item)}
            >
              Pick
            </button>
            <button
                onClick={() => deleteQuestion(item.id)}
            >
              Delete
            </button>
          </li>

        ))
          ):<li>empty</li>}
        </ul>
      </div></h1>
      <AddQuestion
        createQuestion = {createQuestion}
      />
      <VoteCard answers = {answers} question = {currentQuestion} />
      
      <AddAnswer
        createAnswer = {createAnswer}
      /> */}
      

    </>
  )
          }//close main
