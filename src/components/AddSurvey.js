import react from 'react';
import { TextField, Grid, Button } from '@mui/material';
import {useState, useEffect} from 'react';

export default function AddSurvey({createSurvey}){

    const [entry,setEntry] = useState([])

    const submitSurvey = (e) => {
        e.preventDefault()
        if (entry.length <= 60) {
            createSurvey(entry)
        } // from App.js : function of firestore actions
    }

    const handleChange = (e) => {
        console.log("change")
        setEntry(e.target.value)
    }

    return(
        <div>
            <h1>
                Add a Survey
            </h1>
            <form onSubmit = {submitSurvey}>
             <Grid container fullWidth> 
                <Grid item xs={6}>
                <TextField
                required
                    variant = "outlined"
                    label = "Titel"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value = {entry.length === 0 ? "" : entry}
                    onChange = {handleChange}
                    error={entry === ""  || entry.length > 60}
                    helperText={entry.length > 60 ? 'Zu langer Text!' : ' '}
                />
                    
                </Grid>
            </Grid>
            <Button variant="contained" type = "submit">Erstellen</Button>  
                
            </form>
        </div>
    )
}