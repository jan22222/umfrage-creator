    import Slide from '@material-ui/core/Slide';
    import React, { useState, useEffect, createContext } from 'react';
    import {useParams} from "react-router-dom"
    import {CollectionReference, onSnapshot} from "firebase/firestore";
    import { serverTimestamp } from 'firebase/firestore'
    import { db } from '../firebase'
    import { collection, addDoc, setDoc, doc, getDoc, deleteDoc, getDocs, where, query } from "firebase/firestore";
    import { CardActions, Paper } from '@mui/material';
    import AC from "./AnswersForCarousel"
import { QuestionAnswer } from '@mui/icons-material';
    export const UserContext = createContext(null);
    
 export default function Example({user}) {
   const [questionArray, setQuestionArray] = useState([])
   const [questionAndAnswerArray, setQuestionAndAnswerArray] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [questionDocRefs, setQuestionDocRefs] = useState()
   const [abgeschickt, setAbgeschickt] = useState(true)
   const [votingCompleted, setVotingCompleted] = useState(false)
   const [abgeschicktCompletedAt, setAbgeschicktCompletedAt] = useState("")
   const {creatorId, surveyId} = useParams()
   
   
    useEffect(() => {
      setTimeout(function () {
        
        console.log("voteSurvey")
      console.log("user " , user)
      console.log("creatorId", creatorId)
      console.log("surveyId", surveyId)

      const colRef = collection(db, creatorId)  
      console.log("here 1")   
      const docRef = doc(colRef, surveyId)
      const colRef2 = collection(docRef, "questions")
      console.log("here 2")   

      
      function wichtig() {
      
       return new Promise((resolve, reject) => {

       const docSnap =  getDocs(colRef2);
       resolve(docSnap)
       
       })
      }
      
      wichtig().then(
       res =>{
        const help = 
            res.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
        if(!!help){
          setQuestionArray(help)
          setQuestionDocRefs(help.map(item=>doc(colRef2, item.id)))
          setQuestionAndAnswerArray(help.map(item=>{
            return {questionId: item.id, questionText: item.text, answerText: ""}
          }))

        } 
        
       
        setIsLoading(false)
       })

       console.log("in voteSurvey", user)

    }, 5000);
      
  }, [user])
  function checkForAbgeschickt(){
    setVotingCompleted(false)
    const colRef = collection(db, creatorId)  
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "completeVotings")
    const docRef2 = doc(colRef2, user.uid)
    const unsub = onSnapshot(docRef2, (doc) => {
      setAbgeschicktCompletedAt = doc.data().completedAt;
      
    })
    if (unsub.length>0) setVotingCompleted(true)
  }
  function checkForCompletion(){
      let completed = true
      questionAndAnswerArray.forEach(el=> {
       if (el.answerText == "") completed = false
      })
      setVotingCompleted(completed)
  }
  function completion(){
    const colRef = collection(db, creatorId)  
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "completeVotings")
    setDoc(doc(colRef2, user.uid),{completedAt: serverTimestamp()})
  }
  async function setVote(colRef, questionId, answerId, answerText){

    const warten = async ()=>{
      const docRef = doc(colRef, user.uid)
      const check = await  getDoc(docRef)
      return check
    }
      warten().then(check=>{
        //check beinhaltet doc m userId als id 
        
          //ansonsten versuchen, die antwort als docs unter votes zu adden
          const versuch = setDoc(doc(colRef,
            user.uid), { questionId, answerId, answerText })
          .then(()=>{
            const gesIndex = questionAndAnswerArray.findIndex(el=>el.questionId == questionId)
            const el = questionAndAnswerArray[gesIndex]
            el.answerText = answerText 
            let items = [...questionAndAnswerArray];
            items[gesIndex] = el
            setQuestionAndAnswerArray([...items]) 
            console.log("new QAArray", questionAndAnswerArray)
            checkForAbgeschickt()
            if(!abgeschickt){checkForCompletion()}
            
          })
          .catch((e)=>console.log(e))
        
        
      })
      
  }
    
  return(<>
        <h1>Survey xyz Thema xxx </h1>
        <h1>
          {votingCompleted ? <>"Alle Fragen wurden beantwortet am "+{abgeschicktCompletedAt}+"."</>:
            "Noch fehlen Antworten."
          } 
        </h1>
          {votingCompleted && <button onClick={completion()}>Abschicken</button>}
          { isLoading && <p>Lädt...</p>}
          { abgeschickt && !isLoading && <h1>Umfrage bereits abgeschickt!</h1>}
          { !isLoading && !!user && !abgeschickt &&
            <>
              <h2>Your votes</h2>
              <table >
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
            
                  {questionAndAnswerArray.map(el=>
                    <tr>
                      <td>{el.questionText}</td>
                      <td>{el.answerText}</td>
                    </tr>
                   )
                  }
                
                
              </table>
            
            {
                questionArray.map((item, index)=> 
                {
                  return(
                      <Paper key={item.id} sx={{p:5}}> 
                        <h2 >Frage: {item.text}</h2> 
                        <AC  setVote={setVote} questionDocRef = {questionDocRefs[index]} questionId={item.id} creatorId={creatorId} surveyId={surveyId}> questionText={item.text}</AC> 
                      </Paper> 
                  )
                }
                )
              }
            </>  
          }
          
         
           
          
          </>    )
}

