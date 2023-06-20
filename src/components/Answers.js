import React, { useState, Fragment } from "react";
import ShowAnswers from "../tables/ShowAnswers"
import EditAnswer from "./EditAnswer"
import AddQuestions from "./CreateAnswer"

const Answers = props => {
  const creatorName = props.user.name


    return (
    <div className="container">
      <h1>Umfragen unter ihrem Namen</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Liste der Umfragen</h2>
          <ShowAnswers
            answers={props.answers}
            editAnswerRow={props.editAnswerRow}
            deleteAnswer={props.deleteAnswer}
            editingAnswer={props.editingAnswer}
            setEditingAnswer={props.setEditingAnswer}
            currentAnswer={props.currentAnswer}
            updateAnswer={props.updateAnswer}
          />
        </div>
        <div className="flex-large">
          {props.editingAnswer ? (
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
              <h2>Add user</h2>
              <AddQuestions addAnswer={props.addAnswer} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Answers;