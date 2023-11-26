import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import LogOut from './components/logout';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor"
import Home from "./components/Home"
import Editoranswers from "./components/Editoranswers"
import Editorquestions from "./components/Editorquestions"
import Layout from './components/Layout';
import SurveysComponent from "./components/SurveysComponent.js"
import Summary from "./components/Summary.js"
import Vote from "./components/voteSurvey.js"
import { createContext, useContext } from "react";

function App() {

  const userData = { uid: null};

  // Setting state
  const [user, setUser] = useState(userData);

          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUser(user)
              console.log(user)
              // ...

            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
    

  return (
    <>   
    <Router>
    
      <Layout user={user}>
        { user.uid != null ? <>
          <Routes>
              <Route path='/signin' element={<SignIn setUser={setUser} user={user}/>} />
              <Route path='/:creatorId' element={<SurveysComponent />} />
              <Route path='/editor' element={<Editor user={user}/>} />
              <Route path='/survey/:creatorId/:surveyId' element={<Editorquestions user={user}/>} />
              <Route path='/survey/:creatorId/:surveyId/:questionId' element={<Editoranswers user={user}/>} />
              <Route path='/summary/:creatorId/:surveyId' element={<Summary user={user}/>} />
              <Route path='/' element={<Home  user={user}/>} />
              <Route path='/vote/:creatorId/:surveyId' element={!!user&&<Vote  user={user}/>} />
              <Route path='/signup' element={<NotFound/>} />
              <Route path='/logout' element={<LogOut/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes></>:
          <Routes>
            <Route path='/signin' element={<SignIn setUser={setUser} user={null}/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path='/logout' element={<NotFound/>} />
            <Route path='/' element={<NotFound/>} />
          </Routes>
        }
      </Layout>

    </Router>  
    </>
  );
}
function NotFound() {
  return <>Sie haben entweder einen ungültigen Pfad eingegeben oder sind nicht eingeloggt bzw. erforderlicherweise ausgeloggt.</>;
}
export default App;
