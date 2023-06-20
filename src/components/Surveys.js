import React, { useState, Fragment, useEffect } from "react";
import ShowSurveys from "../tables/ShowSurveys"
import ShowQuestions from "../tables/ShowQuestions"
import ShowAnswers from "../tables/ShowAnswers"
import EditSurvey from "./EditSurvey"
import AddSurveys from "./CreateSurvey"
import EditQuestion from "./EditQuestion"
import AddQuestions from "./CreateQuestion"
import EditAnswer from "./EditAnswer"
import AddAnswers from "./CreateAnswer"

const Surveys = props => {

  useEffect(() => {
    console.log("currentSurvey")
    console.log(props.currentSurvey)
  })

    return (
    <div className="container">


      <h1>Umfragen unter ihrem Namen</h1>
        <div className="flex-row">
          <div className="flex-large">
            <h2>Liste der Umfragen</h2>
            <ShowSurveys
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
                currentQuestion={props.currentQuestion}
                updateQuestion={props.updateQuestion}
      
            />
          </div>
          <div className="flex-large">
            {props.editRowSurvey ? (
              <Fragment>
                <h2>Edit survey</h2>
                <EditSurvey
                  editingSurvey={props.editingSurvey}
                  setEditingSurvey={props.setEditingSurvey}
                  currentSurvey={props.currentSurvey}
                  updateSurvey={props.updateSurvey}
                />
              </Fragment>
            ) : (
              <Fragment>
                <h2>Add Survey</h2>
                <AddSurveys addSurvey={props.addSurvey} />
              </Fragment>
            )}
          </div>
          
        </div>



<div className="flex-large">
{props.editingQuestion ? (
  <>
    <h2>List of Answers</h2>
  <ShowAnswers
      Answers={props.Answers}
      editAnswerRow={props.editAnswerRow}
      deleteAnswer={props.deleteAnswer}
      editingAnswer={props.editingAnswer}
      setEditingAnswer={props.setEditingAnswer}
      currentAnswer={props.currentAnswer}
      setCurrentAnswer={props.setCurrentAnswer}
      updateAnswer={props.updateAnswer}
      answers={props.answers}
   

    />
    </>
)
:
(<Fragment>List of Answers for this Question is empty.</Fragment>)
}
  </div>

  <div className="flex-large">
    {props.editRowAnswer ? (
      <Fragment>
        <h2>Edit answer</h2>
        <EditAnswer
          editingAnswer={props.editingAnswer}
          setEditingAnswer={props.setEditingAnswer}
          currentAnswer={props.currentAnswer}
          updateAnswer={props.updateAnswer}
        />
      </Fragment>
    ) : (
      <Fragment>
        <h2>Add Answer</h2>
        <AddAnswers addAnswer={props.addAnswer} />
      </Fragment>
    )}
    
  </div>





<div className="flex-large">
{props.editingSurvey ? (
  <>  
    <h2>List of Questions</h2>
    <ShowQuestions
      questions={props.questions}
      editQuestionRow={props.editQuestionRow}
      deleteQuestion={props.deleteQuestion}
      editingQuestion={props.editingQuestion}
      setEditingQuestion={props.setEditingQuestion}
      currentQuestion={props.currentQuestion}
      setCurrentQuestion={props.setCurrentQuestion}
      updateQuestion={props.updateQuestion}
      currentSurvey ={props.currentSurvey}
      setCurrentSurvey ={props.setCurrentSurvey}
  	  useTimes={props.useTimes}
    />
  </>
  ):(
    <>
      You are not editing any Survey.
    </>    
  )}
  </div>
  <div className="flex-large">
    {props.editRowQuestion ? (
      <Fragment>
        <h2>Edit Question</h2>
        <EditQuestion
          editingQuestion={props.editingQuestion}
          setEditingQuestion={props.setEditingQuestion}
          currentQuestion={props.currentQuestion}
          updateQuestion={props.updateQuestion}
        />
      </Fragment>
    ) : (
      <Fragment>
        <h2>Add Question</h2>
        <AddQuestions addQuestion={props.addQuestion} />
      </Fragment>
    )}
  </div>







    </div>
  );
};

export default Surveys;