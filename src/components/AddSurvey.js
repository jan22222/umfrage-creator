import react from 'react';

import {useState, useEffect} from 'react';

export default function AddSurvey({createSurvey}){

    const [entry,setEntry] = useState([])

    const submitSurvey = (e) => {
        e.preventDefault()
        console.log(entry)
        createSurvey(entry) // from App.js : function of firestore actions
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
                <input 
                    type = "text"
                    value = {entry.length === 0 ? "" : entry}
                    onChange = {handleChange}
                />
                    <button type='submit'>
                        Add
                    </button>   
                
            </form>
        </div>
    )
}