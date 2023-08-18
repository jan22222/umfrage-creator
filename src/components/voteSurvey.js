    import Slide from '@material-ui/core/Slide';
    import React, { useState, useEffect, createContext } from 'react';
    import {useParams} from "react-router-dom"
    import {onSnapshot} from "firebase/firestore";

    import { db } from '../firebase'
    import {collection, addDoc, setDoc, doc, getDoc, deleteDoc, getDocs } from "firebase/firestore";
    import { CardActions, Paper } from '@mui/material';
    import AC from "./AnswersForCarousel"
    export const UserContext = createContext(null);
    
 export default function Example({user}) {
   const [questionArray, setQuestionArray] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [questionDocRefs, setQuestionDocRefs] = useState()
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
        
        } 
        
       
        setIsLoading(false)
       })

        
    }, 5000);
      
  }, [user])

  return(<>
        <h1>Survey xyz Thema xxx</h1>
        
          { isLoading && <p>Lädt...</p>}
          { !isLoading && 

            questionArray.map((item, index)=> 
            {console.log(item);
              return(
       
                 
                  <Paper key={item.id} sx={{p:5}}> 
                    <h2 >Frage:  {item.text}</h2> 
                    
                    <AC user={user} questionDocRef = {questionDocRefs[index]} questionId={item.id} creatorId={creatorId} surveyId={surveyId}> questionText={item.text}</AC> 
                    
                  </Paper> 
               

              )
            }
             )
              
          }
          
         
           
          
          </>    )
}

