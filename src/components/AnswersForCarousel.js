import react, { useEffect, useState, useContext } from "react";
import { Card, makeStyles } from "@material-ui/core";
import { CardActions, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { onAuthStateChanged } from "firebase/auth";
import  auth  from "../firebase";
import AnswersVoteForm from "./AnswersVoteForm";

export default function AnswersForCarousel(props) {
  const [questionDocRef, setQuestionDocRef] = useState(props.questionDocRef);
  const [questionText, setQuestionText] = useState(props.questionText);

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(questionText);
    console.log("answersforcarousel");
    console.log(
      "suvey id",
      props.surveyId,
      "creatorId",
      props.creatorId,
      "questionId",
      props.questionId,
    );
    // answers hier in den state laden
  }, [questionText]);

  const useStyles = makeStyles(() => ({}));

  const classes = useStyles();

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
    } else {
      setUser(null);
    }
  });

  return (
    <div sx={{ width: "100%" }}>
      <Card padding="max(20px,20%)">
        <AnswersVoteForm
          setVote={props.setVote}
          questionDocRef={questionDocRef}
          surveyId={props.surveyId}
          creatorId={props.creatorId}
          questionId={props.questionId}
          questionText={props.questionText}
        />
      </Card>
    </div>
  );
}
