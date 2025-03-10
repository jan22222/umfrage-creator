import react, {useEffect, useState, useContext} from "react"
import { Card, makeStyles } from '@material-ui/core';
import { CardActions, Paper, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AnswersVoteForm from "./AnswersVoteForm2"
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });

export default function AnswersForCarousel(props){

    const [questionDocRef, setQuestionDocRef] = useState(props.questionDocRef)
    const [questionText, setQuestionText] = useState(props.questionText)
 
    useEffect(()=>{
        console.log(questionText)
        console.log("answersforcarousel")
        console.log("suvey id", props.surveyId, "creatorId", props.creatorId, "questionId", props.questionId)
    // answers hier in den state laden 

    },[questionText])
    
  

    const useStyles = makeStyles(() => ({
      
}))

const classes = useStyles(); 

    return(
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                                            Frage: {props.questionText}
                                        </Typography>
                                        <AnswersVoteForm  setVote={props.setVote} questionDocRef = {questionDocRef} surveyId={props.surveyId} creatorId = { props.creatorId } questionId = {props.questionId} questionText={props.questionText} />
                                    </CardContent>
                                </Card>
            )
}