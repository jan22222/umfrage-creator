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

const SurveyTableRow = props => {
  const [survey, setSurvey] = useState(props.surveyValue);
 
  useEffect(() => {
    setSurvey(props.surveyValue);
    console.log(props.surveyValue.id)
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
    props.setEditingSurvey(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSurvey({ ...survey, [name]: value });
  };

  return props.editingSurvey && props.currentSurvey.id === props.surveyValue.id ? (
    <Fragment>
      <tr key={props.surveyValue.id}>
        <td>
          <input
            type="text"
            name="name"
            value={survey.name}
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
            onClick={() => handleUpdateItemClick(survey)}
            className="button muted-button"
          >
            Update
          </button>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr key={props.surveyValue.id}>
        <td>{props.surveyValue.name}</td>
  
        <td>
          <button
            onClick={() => {

                  props.editSurveyRow(props.surveyValue);
              
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

export default SurveyTableRow;
