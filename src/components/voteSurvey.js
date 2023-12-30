    import Slide from '@material-ui/core/Slide';
    import React, { useState, useMemo, useEffect, createContext } from 'react';
    import {useParams} from "react-router-dom"
    import {CollectionReference, onSnapshot} from "firebase/firestore";
    import { serverTimestamp } from 'firebase/firestore'
    import { db } from '../firebase'
    import { collection, addDoc, setDoc, doc, getDoc, updateDoc, getDocs, where, query } from "firebase/firestore";
    import { Typography, CardActions, Paper, Box, Card } from '@mui/material';
    import AC from "./AnswersForCarousel"
    import { styled } from '@mui/system';

import { QuestionAnswer, SettingsInputAntennaSharp } from '@mui/icons-material';

    export const UserContext = createContext(null);
    
 export default function Example({user}) {
   const [questionArray, setQuestionArray] = useState([])
   const [questionAndAnswerArray, setQuestionAndAnswerArray] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [questionDocRefs, setQuestionDocRefs] = useState()
   const [abgeschickt, setAbgeschickt] = useState(false)
   const [votingCompleted, setVotingCompleted] = useState(false)
   const [abgeschicktCompletedAt, setAbgeschicktCompletedAt] = useState("eben gerade")
   const {creatorId, surveyId} = useParams()
   const [title, setTitle] = useState(""); 
   const [times, setTimes] = useState(false); 
   
   //wenn sich email des users ändert, berechne erlaubnis neu. (in memoAuth wird die Email gespeichert,
   //um sie mit der aktuellen user email zu vergleichen. leere email = auch kein auth)
   const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexstart",
    alignItems: "center",
    padding: "10px"
}))
  
   useEffect(() => {
        emailAbgleich()
        setTimeout(function () {



          const colRef = collection(db, creatorId)  
          console.log("here 1")   
          const docRef = doc(colRef, surveyId)

                
          const colRefy = collection(db, "Invitations " + user.email)     
          const docRefy = doc(colRefy, surveyId)
              
          const data = {
              watched : true
          }
   
          updateDoc(docRefy, data).then(()=>{console.log("updated", docRefy, data)})
          

          const colRef2 = collection(docRef, "questions")
          console.log("here 2")   
    
          titlesetter().then((res)=>{setTitle(res)})
    
          async function titlesetter(){
            console.log("TITLESETTER")
            const doc = await getDoc(docRef)
            const title = await doc.get("title");
            
            return(title)
          }
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
          }).then(()=> checkForAbgeschickt())
    
          console.log("in voteSurvey", user)
    
        }, 5000);
      
      
      
  }, [user])

  async function loadTimes(){
      const colRef = collection(db, creatorId)     
      const docRef = doc(colRef, surveyId)
      const colRef2 = collection(docRef, "permissions")
      var newTimes = false
      const unsubscribe = onSnapshot(colRef2, snapshot => {
        console.log("HERERE", snapshot)
          snapshot.docs.map(doc => {
            if (doc.data().email === user.email){
              newTimes = true
              console.log("found email adress.")
            }else{
              console.log("not found")
            }
          }
        );
          setTimes(newTimes);
      });
    }
      
  async function checkForAbgeschickt(){
    // damit voten/ändern nachträglich unmöglich wird
     function wichtig() {
      
      return new Promise((resolve, reject) => {

        const colRef = collection(db, creatorId)  
        const docRef = doc(colRef, surveyId)
        const colRef2 = collection(docRef, "completeVotings")
        const docRef2 = doc(colRef2, user.uid)
        const docSnap =  getDoc(docRef2)
        
        resolve(docSnap)
      
      })
     }
    async function getDate(input){
      return await new Promise((resolve, reject) => {

        const datumString = input.data().completedAt.toDate().toDateString()
        resolve(datumString)
      })
    }     
    await wichtig().then(res=>getDate(res)).then(
      res =>{
          
           setAbgeschicktCompletedAt(res)
           setAbgeschickt(true)
          }).then(()=> checkForAbgeschickt()). catch((err)=>console.log(err)
      )
    
  }

  function checkForCompletion(){
    //damit ist das Voten gemeint, hinterlegt
    //bei firebase unter question/votes
    //nach abschicken wird es bei firebase unter survey/completeVotings gespeichert
      let completed = true
      questionAndAnswerArray.forEach(el=> {
       if (el.answerText == "") completed = false
      })
      setVotingCompleted(completed)
  }
  function abschicken(){
    //abschicken
    const colRef = collection(db, creatorId)  
    const docRef = doc(colRef, surveyId)
    //unter surveys=>completeVotings existiert die information, welche user
    //die survey abgeschlossen haben doc id == user id , inhalt completedAt
    const colRef2 = collection(docRef, "completeVotings")
    
    setDoc(doc(colRef2, user.uid),{completedAt: serverTimestamp()}).then(
      ()=>{setAbgeschickt(true)}
    )
    //jetzt ist es noch erforderlich, unter der answer einen vote zu verzeichnen
    // hierzu =>votes=> addDoc mit random id (anonym) und später können die 
    //votes gezählt werden, questionId, answerId kommen aus questionAnswerArray

    questionAndAnswerArray.forEach(item =>
      {
       const qId = item.questionId
       const aId = item.answerId
       const colRefQuestion = collection(docRef, "questions")
       const docRefQuestion = doc(colRefQuestion, qId)
       const colRefAnswer = collection(docRefQuestion, "answers")
       const docRefAnswer = doc(colRefAnswer, aId)
       const colRefVotes = collection(docRefAnswer, "votes")
       setDoc(doc(colRefVotes, user.uid), {vote : "Vote"}).then(docRef => {
        console.log("neues Doc für vote", colRefVotes.id); //p4eZcO5QV43IYnigxALJ
       })
       .catch(error => {
            console.log(error);
        })   
      })
  }
  async function setVote(colRef, questionId, answerId, answerText){

    const warten = async ()=>{
      const docRef = doc(colRef, user.uid)
      const check = await getDoc(docRef)
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
            el.answerId = answerId
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
  
  //useMemo triggert diese Funktion
  async function emailAbgleich(){
    await loadTimes()
    return times
  }

  
  return(
    
      <StyledBox>
        <Card>
            <Typography gutterBottom variant="h5" component="h5">
              
               Umfrage: <p>Id {surveyId}, erstellt von {creatorId} </p>
            <p>Umfragetitel: {title}</p>
            </Typography>
        </Card>
            {!times && <h1>Sie sind zu dieser Umfrage nicht zugelassen.</h1>}
            <h1>
              {times && votingCompleted && !abgeschickt && <>"Alle Fragen wurden beantwortet, aber noch nicht abgeschickt." <button onClick={abschicken()}>Abschicken</button></>
              } 
            </h1>
              { times && isLoading && <p>Lädt...</p>}
              { times && abgeschickt && !isLoading && <h1>Umfrage bereits abgeschickt am : {abgeschicktCompletedAt}.
               </h1>}
              { times && !isLoading && !!user && !abgeschickt &&
                <>
                <Card>
                <Typography gutterBottom variant="h5" component="h5">
                {questionAndAnswerArray.length > 0 ? <> 
                  <h2>Ihre Votes</h2>
                    <table >
                      <tr>
                        <th>Frage</th>
                        <th>Antwort</th>
                      </tr>
                    
                        {questionAndAnswerArray.map(el=>
                          <tr>
                            <td>{el.questionText}</td>
                            <td>{el.answerText}</td>
                          </tr>
                        )
                        }
                    </table>
                  </>: <>Keine Fragen angelegt.</>}
                  </Typography>
                  </Card>
                {
                    questionArray.map((item, index)=> 
                    {
                      return(
                        
                            <AC key={item.id} setVote={setVote} questionDocRef = {questionDocRefs[index]} questionId={item.id} creatorId={creatorId} surveyId={surveyId} questionText={item.text}></AC> 
                          
                      )
                    }
                    )
                  }
                </>  
              }
            
        </StyledBox>  
  )
}

