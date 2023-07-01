import react from 'react';

import {useState, useEffect} from 'react';

export default function AddQuestion({createQuestion}){

    const [entry,setEntry] = useState([])

    const submitQuestion = (e) => {
        e.preventDefault()
        console.log(entry)
        createQuestion(entry) // from App.js : function of firestore actions
    }

    const handleChange = (e) => {
        console.log("change")
        setEntry(e.target.value)
    }

    return(
        <div>
            <h1>
                Add a Question
            </h1>
            <form onSubmit = {submitQuestion}>
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