import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
// import Surveys from "./components/Surveys"


import {onSnapshot} from "firebase/firestore";
import Answers from "./components/Answers"
import { db } from './firebase'
import {collection, addDoc, setDoc, doc } from "firebase/firestore";

function App() {

  const userData = { id: null};
  const initialFormStateSurvey = "2r1rJNpi1w3FVNBLBViP";
  const initialFormStateSurveys = [{ id: null, name: "" }];
  const initialFormStateQuestion = { id: null, text: "" };
  const initialFormStateQuestions = [{ id: null, text: "" }];
  const initialFormStateAnswer = { id: null, text: "" };
  const initialFormStateAnswers = [{ id: null, text: "" }];
  // Setting state
  const [user, setUser] = useState(userData);
  const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
  const [surveys, setSurveys] = useState(initialFormStateSurveys);
  const [questions, setQuestions] = useState(initialFormStateQuestions);
  const [answers, setAnswers] = useState(initialFormStateAnswers);
  
  const [editingSurvey, setEditingSurvey] = useState(false);
  
  const [currentQuestion, setCurrentQuestion] = useState(initialFormStateQuestion);
  const [editingQuestion, setEditingQuestion] = useState(false);

  const [currentAnswer, setCurrentAnswer] = useState(initialFormStateAnswer);
  const [editingAnswer, setEditingAnswer] = useState(false);


  const [times, setTimes] = useState([]);
    const [times2, setTimes2] = useState([]);
    useEffect(() => {
      
      const colRef = collection(db, "test")
      const unsubscribe = onSnapshot(colRef, snapshot => {
          const newTimes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })

          );
      
          setTimes( newTimes);
        });
          const docRef = doc(colRef, currentSurvey)
          const colRef2 = collection(docRef, "questions")
          const unsubscribe2 = onSnapshot(colRef2, snapshot => {
              const newTimes2 = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setTimes2(newTimes2);
            });   
    }, [currentSurvey])

  const addAnswer = answer => {
    const docRef1 = doc(db, "test", currentSurvey.id)
    const colRef1 = collection(docRef1, "questions")
    const docRef2 = doc(colRef1, currentQuestion.id)
    const colRef2 = collection(docRef2, "answers")
    addDoc(colRef2, answer)
 }
  const addQuestion = question => {
    console.log("addQuestion called")
    console.log("Survey is ",currentSurvey.id)
    console.log("question is ", question)
    const docRef = doc(db, "test", currentSurvey.id)
    const colRef = collection(docRef, "questions")
    addDoc(colRef, question)
 }
  const addSurvey = survey => {
     const ref = collection(db, "test")
     addDoc(ref, {name: survey.name})
     console.log("addSurvey")
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

  const deleteQuestion = (id)=>{
    setEditingQuestion(false);
    setQuestions(questions.filter(question => question.id !== id));
  }  
  const deleteAnswer = (id)=>{
    setEditingAnswer(false);
    setAnswers(answers.filter(answer => answer.id !== id));
  }    
  const deleteSurvey = (id)=>{
    console.log("call of deleteSurvey")
    setEditingSurvey(false);
    console.log("setEditingSurvey(false);")

    setSurveys(surveys.filter(survey => survey.id !== id));
    console.log("setSurveys(surveys.filter(survey => survey.id !== id));")
  }  
  const updateSurvey = (updatedSurvey) => {
    setEditingSurvey(false);
    const docRef = doc(db, "test", updatedSurvey.id)
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

  const Klick = (id) => {
    setCurrentSurvey(id)
  }
  // useEffect(()=>{
  //   onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/firebase.User
  //         const uid = user.uid;
  //         setUser({uid})
  //         // ...
  //         console.log("user", user.uid)
  //         console.log("survey", currentSurvey)
  //       } else {
  //         // User is signed out
  //         // ...
  //         console.log("user is logged out")
  //       }
  //     });
    
      


  // }, [])
  return (
    <>
    <h1>Current Survey {currentSurvey} <div>
        <ul>{times.length > 0 ? (
          times.map(item => (
            <li key={item}>{item.id}
              <button 
              onClick={() => Klick(item.id)}
               
              >
                Pick
              </button>
            </li>
            
          ))
          
          ):<li>empty</li>
          }
          
        </ul>
      </div></h1>
      <h1>Questions  <div>
        <ul>{times2.length > 0 ? (
          times2.map(item => (
            <li key={item}>{item.id}</li>
          ))):<li>empty</li>}
        </ul>
      </div></h1>
    <Router>

      <Navbar />
      <Routes>
      <Route path='/signin' element={<SignIn
        setUser={setUser}
      />} />

        {/* <Route path='/surveys' 
              element={
                <Surveys
                  user={user}
                  currentSurvey={currentSurvey}
                  setCurrentSurvey={setCurrentSurvey}
                  addSurvey={addSurvey}
                 
                  surveys={surveys}
                  editSurveyRow={editSurveyRow}
                  deleteSurvey={deleteSurvey}
                  editingSurvey={editingSurvey}
                  setEditingSurvey={setEditingSurvey}
                  updateSurvey={updateSurvey}
                  currentQuestion={currentQuestion}
        
                  // useTimes={useTimes}
            
                  setCurrentQuestion={setCurrentQuestion}
                  setQuestions={setQuestions}

                  addQuestion={addQuestion}
                  questions={questions}
                  editQuestionRow={editQuestionRow}
                  deleteQuestion={deleteQuestion}
                  editingQuestion={editingQuestion}
                  setEditingQuestion={setEditingQuestion}
                  updateQuestion={updateQuestion}
            
           
                
                  currentAnswer={currentAnswer}
                  setCurrentAnswer={setCurrentAnswer}
                  addAnswer={addAnswer}
                  answers={answers}
                  editAnswerRow={editAnswerRow}
                  deleteAnswer={deleteAnswer}
                  editingAnswer={editingAnswer}
                  setEditingAnswer={setEditingAnswer}
                  updateAnswer={updateAnswer}
                />
              } 
        /> */}

        <Route path='/signup' element={<SignUp/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  );
}
function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}
export default App;
