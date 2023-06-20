import React, { useState, useEffect } from "react";
import {db} from "../firebase";
import {onSnapshot, collection, doc} from "firebase/firestore";
import SurveyTableRow from "./SurveyTableRow";

const ShowSurveys = props => {
const times = props.useTimes();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surveyname {props.currentSurvey.id}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.surveys.length > 0 ? (
          times.map(surveyValue => ( 
            <SurveyTableRow
              key={surveyValue.id}
              surveyValue={surveyValue}
              surveys={props.surveys}
              editSurveyRow={props.editSurveyRow}
              deleteSurvey={props.deleteSurvey}
              editingSurvey={props.editingSurvey}
              setEditingSurvey={props.setEditingSurvey}
              currentSurvey={props.currentSurvey}
              setCurrentSurvey={props.setCurrentSurvey}
              updateSurvey={props.updateSurvey}
              questions={props.questions}
              editQuestionRow={props.editQuestionRow}
              deleteQuestion={props.deleteQuestion}
              editingQuestion={props.editingQuestion}
              setEditingQuestion={props.setEditingQuestion}
              setQuestions={props.setQuestions}
              currentQuestion={props.currentQuestion}
              updateQuestion={props.updateQuestion}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Surveys</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ShowSurveys;