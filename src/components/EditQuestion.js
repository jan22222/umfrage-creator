import React, { useState, useEffect } from "react";

const EditQuestionForm = props => {
  const [question, setQuestion] = useState(props.currentQuestion);

  useEffect(() => {
    setQuestion(props.currentQuestion);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateQuestion(question);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="text"
        value={question.text}
        onChange={handleInputChange}
      />
      
      <button>Update Question</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditQuestionForm;
