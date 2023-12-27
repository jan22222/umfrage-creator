import * as React from 'react';
import {useState, useEffect, useContext} from "react"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import  {Button, Card} from '@mui/material';
import {onSnapshot, setIndexConfiguration} from "firebase/firestore";
import { db } from '../firebase'
import {collection, updateDoc, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";


export default function ErrorRadios(props) {
  const [answerText, setAnswerText] = React.useState("");
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Sie können die Stimme korrigieren, solange nicht alle Fragen beantwortet wurden. Bei Vollständigkeit wird das Formular abgeschickt.');
  const [answerDocRefArray, setAnswerDocRefArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [answerArray, setAnswerArray] = useState([])

  useEffect(()=>{
    
    console.log("AnswersVoteForm")
  
    console.log("props.questionText", props.questionText)
    console.log("creatorId", props.creatorId)
    console.log("surveyId", props.surveyId)
    console.log("qId", props.questionId)
    console.log("props.questionDocRef", props.questionDocRef)
    console.log("creatorId", props.creatorId)
    console.log("surveyId", props.surveyId)

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
        
  }, [isLoading])

  const handleRadioChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value);
    const checkFunc = (item) => {
      return item.id == event.target.value
    }
    const yourAnswer = answerArray.find(checkFunc)
    const answerText = yourAnswer.answer
    console.log(answerText)
    setAnswerText(answerText)
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit")
    const colRef2 = collection(props.questionDocRef, "votes")
    console.log(colRef2)
    console.log(props.questionId)
    const answerId = value
    props.setVote(colRef2, props.questionId, answerId, answerText)
  };

  return (
    <Card variant="outlined" sx={{p:3}}>
    <form onSubmit={handleSubmit}>
      <FormControl  error={error} variant="standard">
        <FormLabel id="label1">Frage: {props.questionText}</FormLabel>
        <RadioGroup sx={{m:3}}
          aria-labelledby="label1"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {isLoading && <p>Lädt...</p>}
          {!isLoading  && answerArray.map((item, index)=>
            (
                <ControlUnit index={index} value={item.id} control={<Radio />} label={item.answer} answerDocRef={answerDocRefArray[index]}/>
            )
          )}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 3, mr: 1, width: 100 }} type="submit" variant="contained">
            Stimmen
        </Button>
      </FormControl>
    </form>
    </Card>
  );
}

function ControlUnit(props){
    return(
        <FormControlLabel value={props.value} control={props.control} label={props.label} answerDocRef={props.answerDocRef}/>     
    )
}