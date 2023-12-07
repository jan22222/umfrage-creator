import React, {useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { CircularProgress } from '@mui/material';
import { useMemo , useContext, createContext} from 'react';
import { useRef, useEffect} from "react";
import emailjs from "@emailjs/browser";
import {useParams} from "react-router-dom"

import {onSnapshot} from "firebase/firestore";

import { Box } from "@mui/material";

import { db } from '../firebase'
import {collection, getDoc, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";

import { query, where } from "firebase/firestore";

import Add from './Add';


export default function Invitation(props) {
  
  const { surveyId, creatorId } = useParams();
  
  const [user, setUser] = useState(props.user);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [times, setTimes] = useState();
  const [emailError, setEmailError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [sender, setSender] = useState(props.user.email);
  const [auth, setAuth] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("")

  const Abschicken = () => {
    console.log(emails)
    const colRef = collection(db, creatorId)     
    const docRef = doc(colRef, surveyId)
    const colRef2 = collection(docRef, "permissions")
    emails.map(
      email => {
        const q = query(colRef2, where("email", "==", email));
        async function qsn(q){
          const querySnapshot = await getDocs(q); 
          return querySnapshot 
        }
        qsn(q).then(ss=>{
          console.log(ss)
          if(ss.empty) {
            const docRef2 = addDoc(colRef2, {email})
            console.log("einlad"+ email)
            const colxRef = collection(db, "Invitations " + email) 
            console.log(colxRef) 
            const docxRef = addDoc(colxRef, {link: "./vote/"+creatorId+"/"+surveyId, title,
            creatoremail: user.email}) 
            console.log(docxRef)
            console.log("geadded")
            const serviceId = "service_hsd4xpj";
            const templateId = "template_cfqqbyr";
            console.log(email, "email")
            try {
              setLoading(true);
              async function sendEmail(){
                await emailjs.send(serviceId, templateId, {
                  email,
                  sender: user.email,
                  title,
                  link: "./vote/"+creatorId+"/"+surveyId
                 });
                 alert("Per Email informiert.");
              }
              sendEmail()
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
              setEmails([])
            }
          } else {
            console.log("existiert bereits")
          }
        })
        
      }
    )
    
  }

  const löschen = (index) =>{
    let emails2 = emails
    const x = emails2.splice(index, 1);
    setEmails([...emails2])
    console.log(emails)
  }

  const AddEmail = (e) => {
    e.preventDefault()
    setEmails([...emails, email])
    setEmail("")
    console.log(emails)
  }
  useEffect(() => {

     setAuth(user.uid === creatorId)
      
     try{
      emailjs.init("UyDRDWE8kWGKZilvk")
      const colRef = collection(db, creatorId)     
      const docRef = doc(colRef, surveyId)
      titlesetter().then((res)=>{setTitle(res)})
    
          async function titlesetter(){
            console.log("TITLESETTER")
            const doc = await getDoc(docRef)
            const title = await doc.get("title");
            
            return(title)
          }
      const colRef2 = collection(docRef, "permissions")
      const unsubscribe = onSnapshot(colRef2, snapshot => {
        console.log("jet", snapshot)
          const newTimes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })
        );
          setTimes(newTimes);
          setIsLoading(false)
      });

   
     } //try block ends
       catch{
             console.log("no survey")
       }
  }, [])

  return (
    <div style={{height: "80vh"}}> 
      { isLoading ?
        <div style={{height: "50%", width:"50px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress />
        </div>:
        <>
         
    {auth &&
    <Box sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: "column"}} >
      <h1>
          Tragen Sie die zugelassenen Teilnehmer hier ein. (Email)
        <p>
          Sie werden per Email informiert und erhalten die Teilnahmeberechtigung.
        </p>
      </h1>
      <h1>Liste der eingetragenen Teilnehmer:</h1>
        <h2>
          {times?times.map(function(data, index) {
            return (
              <div>
                {index+1}:  {data.email}
              </div>
            )
          }): <>Keine Einträge.</>} 
        </h2>
      <h1>Liste der neuen Teilnehmer:</h1>
        <h2>
          {emails != [] ? emails.map(function(data, index) {
            return (
              <div>
                {index+1}:  {data}
                <p>
                  <Button onClick={()=>löschen(index)}>Löschen</Button>
                </p>
              </div>
            )
          }): <>Keine Einträge.</>} 
        </h2>
        <Button variant="outlined" color="primary" onClick={() => {
                Abschicken()}} 
        >Abschicken.</Button>
      <h1>
        Bitte hier eintragen:
      </h1>
      <form autoComplete="off" onSubmit={AddEmail}>
            <h2>Neue Email</h2>
                <TextField 
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Add Email</Button>
        </form>
    </Box>}
        </>
      }
    </div>
    
  )
}
