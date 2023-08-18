import * as React from 'react';
import {useState, useEffect, useContext} from "react"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {onSnapshot} from "firebase/firestore";
import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";


export default function ErrorRadios(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Sie können die Stimme nicht zurücknehmen, überlegen Sie gut.');
  const [answerDocRefArray, setAnswerDocRefArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [answerArray, setAnswerArray] = useState([])
 
  useEffect(()=>{
    
    console.log("AnswersVoteForm")
    console.log("user", props.user)
    console.log("props.questionText", props.questionText)
 
        console.log("creatorId", props.creatorId)
        console.log("surveyId", props.surveyId)
        console.log("qId", props.questionId)
        console.log("props.questionDocRef", props.questionDocRef)
        console.log("creatorId", props.creatorId)
      console.log("surveyId", props.surveyId)

    //   const colRef = collection(db, props.creatorId)  
    //   console.log("here 1")   
    //   const docRef = doc(colRef, props.surveyId)
    //   const colRef2 = collection(docRef, "questions")
    //   console.log("here 2")   
    //   const docRef3 = doc(colRef2, props.questionId)
      const colRef3 = collection(props.questionDocRef, "answers")

      function wichtig() {
      
       return new Promise((resolve, reject) => {

       const docSnap =  getDocs(colRef3);
       
       resolve(docSnap)
       
       })
      }
      

     async function loadDocRef(item){
      console.log("item.id", item.id)
      console.log("colRef3", colRef3)
      
      const newDocRef = await doc(colRef3, item.id) 
      return newDocRef 
     }
      wichtig().then(
        
        res =>{
            console.log("docSnap to", props.questionId, "is", res)
            const help = 
            res.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
        setAnswerArray(help)
        return help
       }).then(help=>{
        const speichern = help.map(item=>{
          const docRef = loadDocRef(item)
          return docRef
        })
          return Promise.all(speichern)
        })
        .then(speichern=>{
          setAnswerDocRefArray(speichern)
          setIsLoading(false)})
        
       
        

  }, [])

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl  error={error} variant="standard">
        <FormLabel id="demo-error-radios">{props.questionText}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
        {isLoading && <p>Lädt...</p>}
        {!isLoading && answerArray.map((item, index)=>
        (
            <ControlUnit  user={props.user} value={item.id} control={<Radio />} label={item.answer} answerDocRef={answerDocRefArray[index]}/>

          )

        )}
          
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1, width: 100 }} type="submit" variant="outlined">
            Stimmen
        </Button>
      </FormControl>
    </form>
  );
}

function ControlUnit(props){
    useEffect(()=>{
      console.log(props.user)
      // const colRef = collection(props.answerDocRef, "votes")
      // addDoc(colRef,  {userId: props.user.uid, voted: true})
    },[])
    
    return(
        
        <FormControlLabel value={props.value} control={props.control} label={props.label} answerDocRef={props.answerDocRef}/>
            
    )
}