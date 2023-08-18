import react, {useEffect, useState, useContext} from "react"
import { Card, makeStyles } from '@material-ui/core';
import { CardActions, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AnswersVoteForm from "./AnswersVoteForm"


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
        <div sx={{width:"100vw"}}>
          
                <Paper className={classes.card2}>
                    
                    <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <div><h1>{props.questionText}</h1></div>
                    </Grid>
                    <Grid item xs={8} >
                        <AnswersVoteForm questionDocRef = {questionDocRef} surveyId={props.surveyId} creatorId = { props.creatorId } questionId = {props.questionId} questionText={questionText} />
                    </Grid>
                    
                    </Grid>
                </Paper>
     
            
        </div>
    )
}