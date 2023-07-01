import react from 'react';

import {useState, useEffect} from 'react';

export default function AddAnswer({createAnswer}){

    const [entry,setEntry] = useState([])

    const submitAnswer = (e) => {
        e.preventDefault()
        console.log(entry)
        createAnswer(entry) // from App.js : function of firestore actions
    }

    const handleChange = (e) => {
        console.log("change")
        setEntry(e.target.value)
    }

    return(
        <div>
            <h1>
                Add an Answer
            </h1>
            <form onSubmit = {submitAnswer}>
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