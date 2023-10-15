import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {onSnapshot} from "firebase/firestore";
import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import {useParams} from "react-router-dom"


export default function Summary({user}) {
    const { surveyId, creatorId } = useParams();
    useEffect(()=>{
    //Alle DocRefs für questions in state laden - questionRefsArray
    //loop
    //Für jede question alle answers -> Die Docs im Vote-Ordner zählen
    // in array, answerDocRefs, direkt ausgeben
    // noch aqusgeben, wer gevotet hat, ab 3 voters
    loadData()
    console.log(surveyId, creatorId)
    console.log(creatorId===user.uid)
},[])
const [numberCompletions, setNumbercompletions] = useState(0);
const [questionArray, setQuestionArray] = useState([])

const loadData = 
  (user, surveyId) => {
  console.log("loadData")  
  console.log(surveyId)
  }

  const checkIfSurveyCompletedByUser = (surveyId, userId) => {
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "completeVotings")
    const docRef2 = doc(colRef2, userId)
    const docSnap = getDocs(docRef2); 
    if(docSnap.exists()){return true}  
    return false
  }

  const loadAllQuestions = (surveyId) => {
    //questions als array in state
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    setQuestionArray(getDocs(colRef2))
    //hier kontrollieren
  }

  const LoadAllAnswersForQuestion = (questionId) => {
    //answers in array laden, array returnen.
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "questions")
    const docRef2 = doc(colRef2, questionId)
    const colRef3 = collection(docRef2, "answers")
    const snapshot = getDocs(colRef3)
    return snapshot
    //kontrollieren
  }

return (
  <> 
    <h1>
        Data (Votes) for survey with id {surveyId}
    </h1>
    <h2>
        Number of completions {numberCompletions}
    </h2>
    <h2>
        All questions
    </h2>
    {questionArray.length > 0 &&
        <h2>
            {
                    questionArray.map(question => {
                       const answers = LoadAllAnswersForQuestion(question.id)
                       return(<>
                            <p>{question.text}</p>
                            <AnswerDisplay anwers={answers}></AnswerDisplay>
                            </>) 
                    }
                    )
                
            }
        </h2>
    }
  </>
    )
}

function AnswerDisplay (answers, questionId) {

    const { surveyId, creatorId } = useParams();

    const countVotesForAnswer = (questionId, answerId) => {
        console.log(questionId)
        const colRef = collection(db, creatorId)     
        const docRef = doc(colRef, surveyId)
        const colRef2 = collection(docRef, "questions")
        const docRef2 = doc(colRef2, questionId)
        const colRef3 = collection(docRef2, "answers")
        const docRef3 = doc(colRef3, answerId)
        const colRef4 = collection(docRef3, "votes")
        const snapshot = colRef4.count().get();
        const countVotes = snapshot.data().count
        return countVotes
      }

    return(
        <>{

            answers.map(
                el=><><p>
                    el.text
                </p>
                <p>
                    {countVotesForAnswer(questionId, el.id)} 
                </p></>) 
        }
            
            
        </>
    )
}