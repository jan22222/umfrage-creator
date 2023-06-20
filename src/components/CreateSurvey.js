import React, { useState } from "react";
import firebase from "../firebase";

const AddSurveyForm = props => {
  const initialFormState = { name: ""};
  const [survey, setSurvey] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setSurvey({ ...survey, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!survey.name) return;

        props.addSurvey(survey);
        setSurvey(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={survey.name}
        onChange={handleInputChange}
      />

      <button>Add new Survey</button>
    </form>
  );
};

export default AddSurveyForm;
