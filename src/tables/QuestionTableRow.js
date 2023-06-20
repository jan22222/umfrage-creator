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

const QuestionTableRow = props => {
  const [question, setQuestion] = useState({id:null, text: ""});
  const navigate = useNavigate();
  useEffect(() => {
    setQuestion(props.currentQuestion);
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
    props.setEditingQuestion(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  return props.editingQuestion && props.currentQuestion.id === props.questionValue.id ? (
    <Fragment>
      <tr key={props.questionValue.id}>
        <td>
          <input
            type="text"
            name="text"
            value={props.questionValue.text}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <button
            onClick={() => props.setEditingQuestion(false)}
            className="button muted-button"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateItemClick(question)}
            className="button muted-button"
          >
            Update
          </button>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr key={props.questionValue.id}>
        <td>{props.questionValue.text}</td>
   
        <td>
          <button
            onClick={() => {

          props.editQuestionRow(props.questionValue);
          navigate("/answers",{
                state: {
              answers:props.answers,
              editAnswerRow:props.editAnswerRow,
              deleteAnswer:props.deleteAnswer,
              editingAnswer:props.editingAnswer,
              setEditingAnswer:props.setEditingAnswer,
              currentAnswer:props.currentAnswer,
              updateAnswer:props.updateAnswer,
                  
            }
          }); 
            }}
            className="button muted-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(props.questionValue.id)}
            className="button muted-button"
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default QuestionTableRow;
