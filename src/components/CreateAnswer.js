import React, { useState } from "react";
import firebase from "../firebase";

const AddAnswerForm = props => {
  const initialFormState = { id: null, text: "" };
  const [answer, setAnswer] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setAnswer({ ...answer, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.addAnswer(answer);
        setAnswer(initialFormState);
      }}
    >
      <label>Text</label>
      <input
        type="text"
        name="text"
        value={answer.text}
        onChange={handleInputChange}
      />
      
      <button>Add new Answer</button>
    </form>
  );
};

export default AddAnswerForm;
