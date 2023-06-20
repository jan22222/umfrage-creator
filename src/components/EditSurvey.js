import React, { useState, useEffect } from "react";

const EditSurveyForm = props => {
  const [survey, setSurvey] = useState(props.currentSurvey);
  useEffect(() => {
    setSurvey(props.currentSurvey);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSurvey({ ...survey, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateSurvey(survey);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={survey.name}
        onChange={handleInputChange}
      />
      
      <button>Update Survey</button>
      <button
        onClick={() => props.setEditingSurvey(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditSurveyForm;
