import React, { useState, useEffect, Fragment } from "react";
import AnswerTableRow from "./AnswerTableRow";
 
import {db} from "../firebase";
import {onSnapshot, doc, setDoc, deleteDoc, collection} from "firebase/firestore";





function useTimes(sortBy = "TIME_ASC") {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "test")
    const unsubscribe = onSnapshot(colRef, snapshot => {
        const newTimes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTimes(newTimes);
      });
    return () => unsubscribe();
  }, [sortBy]);

  return times;
}


const AnswerTable = props => {
  const [answer, setAnswer] = useState(props.currentAnswer);
  const times = useTimes();

  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.answers.length > 0 ? (
          
          times.map(answerValue => (
            <AnswerTableRow
              key={answerValue.id}
              answerValue={answerValue}
              answers={props.answers}
              editAnswerRow={props.editAnswerRow}
              deleteQuestion={props.deleteQuestion}
              editing={props.editing}
              setEditing={props.setEditing}
              currentQuestion={props.currentQuestion}
              updateQuestion={props.updateQuestion}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Questions</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AnswerTable;