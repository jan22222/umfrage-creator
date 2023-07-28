import React from 'react';

import AddAnswer from "./AddAnswer"
import AddSurvey from './AddSurvey'
import AddQuestion from './AddQuestion';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {onSnapshot} from "firebase/firestore";

import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";

export default function AnswerComponent({questionRef}) {

    const initialFormStateAnswers = [{ id: null, answer: "" }];
    const [times, setTimes] = useState([{}]);

    useEffect(()=>{
        console.log("useEffect executed", questionRef.id)
        const colRef = collection(questionRef, "answers")
        const unsubscribe = onSnapshot(colRef, snapshot => {
            const newTimes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })
            );
            setTimes(newTimes);
            
          });
    },[])

    return(<>
            {times.length > 0 ? (times.map( i=> {return(
            <tr>
                <td key={i.id}>
                    {i.answer}
                    <button>
                        Vote
                    </button>
                </td>
            </tr>
            )})):
            (<tr>no answers</tr>)
            }
        </>
    )
}