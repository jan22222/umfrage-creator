import React, { useState } from "react";
import firebase from "../firebase";

const AddQuestionForm = props => {
  const initialFormState = {  text: "" };
  const [question, setQuestion] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!question.text ) return;

        props.addQuestion(question);
        setQuestion(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="text"
        value={question.text}
        onChange={handleInputChange}
      />
 
      <button>Add new Question</button>
    </form>
  );
};

export default AddQuestionForm;
