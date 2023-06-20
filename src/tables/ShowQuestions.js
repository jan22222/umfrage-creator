import React, { useState, useEffect, Fragment } from "react";

import QuestionTableRow from "./QuestionTableRow";

import {db} from "../firebase";
import {onSnapshot, collection, doc, addDoc} from "firebase/firestore";

const QuestionTable = props => {
  const [times, setTimes] = useState([]);
  const [times2, setTimes2] = useState([]);
  function us(sortBy = "TIME_ASC", props) {
    
    
      const colRef = collection(db, "test")
      const docRef = doc(colRef, "DncN1lER08pygoUn08PO")
      const colRef2 = collection(docRef, "questions")
      const unsubscribe = onSnapshot(colRef2, snapshot => {
          const newTimes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTimes(newTimes);
        });
  
        
      unsubscribe()
  
   
  }
  useEffect((props)=>{
    us(props);
    console.log("showq useEffect")}
  ,[])
  
  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>
    
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
         {times.length > 0 ? (
          times.map(questionValue => (
            <QuestionTableRow
              key={questionValue.id}
              questionValue={questionValue}
              questions={props.questions}
              editRow={props.editRow}
              deleteQuestion={props.deleteQuestion}
              editing={props.editing}
              setEditing={props.setEditing}
              currentQuestion={props.currentQuestion}
              updateQuestion={props.updateQuestion}
              currentSurvey ={props.currentSurvey}
              setCurrentSurvey ={props.setCurrentSurvey}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Questions {props.currentSurvey.id}</td>
          </tr>
        )} 
      </tbody>
    </table>
  );
};

export default QuestionTable;