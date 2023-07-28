import react from "react"
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {onSnapshot} from "firebase/firestore";
import { db } from '../firebase'
import AnswerComponent from "./AnswerComponent.js"
import Card from "./voteCard.js"

export default function Vote() {
    const { id, creatorId } = useParams();
    const initialFormStateSurvey = { id: null, title: "" };
    const initialFormStateSurveys = [{ id: null, title: "" }];
    const initialFormStateQuestion = { id: null, text: "" };
    const initialFormStateQuestions = [{ id: null, text: "" }];
    const initialFormStateAnswer = { id: null, answer: "" };
    const initialFormStateAnswers = [{ id: null, answer: "" }];

    const [currentSurvey, setCurrentSurvey] = useState(initialFormStateSurvey);
    const [surveys, setSurveys] = useState(initialFormStateSurveys);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(initialFormStateAnswers);
    const [editingSurvey, setEditingSurvey] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(initialFormStateQuestion);
    const [editingQuestion, setEditingQuestion] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(initialFormStateAnswer);
    const [editingAnswer, setEditingAnswer] = useState(false);
    const [times, setTimes] = useState([]); //used
    const [times2, setTimes2] = useState([]);
    const [times3, setTimes3] = useState([]);

    useEffect(()=>{
            const colRef = collection(db, creatorId)
            console.log(colRef)
            const docRef = doc(colRef, id)
            console.log(docRef)
            const colRef2 = collection(docRef, "questions")
            //colRef2 Saver
            setQuestions(colRef2)
            console.log(colRef2)
            const unsubscribe = onSnapshot(colRef2, snapshot => {
                const newTimes = snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                })
                );
                setTimes( newTimes);
              });
    },[])

        
    return (
        <>
            <h1>
                Survey with id {id} of user with id {creatorId}
            </h1>
            <Card>sdfsdf</Card>
            <h1>Questions </h1>
             <div>
                <div>{times.length > 0 ? (
                    times.map(item => (
                        <table key={item.id}>
                            
                            <thead><td>Answers to {item.text}</td></thead>
                            <tbody></tbody>
                            <AnswerComponent questionRef={doc(questions, item.id)} />
                        </table>
          
                  ))
                 ):<div>empty</div>}
                </div>
             </div>
  
        </>
    )
} 