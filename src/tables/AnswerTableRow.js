import React, { useState, useEffect, Fragment } from "react";
import {db} from "../firebase";
import {onSnapshot, doc, setDoc, deleteDoc, collection} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function useTimes(sortBy = "TIME_ASC") {
  const [times, setTimes] = useState([]);
  
  useEffect(() => {
    const colRef = collection(db, "test")
    // unsubscribe callback when done
    const unsubscribe = 
    onSnapshot(colRef, snapshot => {
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

const AnswerTableRow = props => {
  const [answer, setAnswer] = useState(props.currentAnswer);
  const navigate = useNavigate();
  useEffect(() => {
    setAnswer(props.currentAnswer);
  }, [props]);

  const handleDeleteClick = id => {
    const docRef = doc(db, "test", id)
    deleteDoc(docRef)
  };

  const handleUpdateItemClick = data => {
    const docRef = 
    doc(db,
        "test",
        data.id)
    setDoc(docRef, data)  
    props.setEditingAnswer(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAnswer({ ...answer, [name]: value });
  };

  return props.editingAnswer && props.currentAnswer.id === props.answerValue.id ? (
    <Fragment>
      <tr key={props.answerValue.id}>
        <td>
          <input
            type="text"
            name="text"
            value={answer.text}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <button
            onClick={() => props.setEditingSurvey(false)}
            className="button muted-button"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateItemClick(answer)}
            className="button muted-button"
          >
            Update
          </button>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr key={props.answerValue.id}>
        <td>{props.answerValue.name}</td>
    
        <td>
          <button
            onClick={() => {

              props.editAnswerRow(props.answerValue);
              navigate("/questions");  
            }}
            className="button muted-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(props.surveyValue.id)}
            className="button muted-button"
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default AnswerTableRow;
