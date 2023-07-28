import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor"
import Home from "./components/Home"
import Vote from "./components/Vote"
import Layout from './components/Layout';
import SurveysComponent from "./components/SurveysComponent.js"

function App() {

  const userData = { id: null};

  // Setting state
  const [user, setUser] = useState(userData);
 
    useEffect(() => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUser({uid})
              // ...

            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
    }, [])

  return (
  <>   
  <Router>

    <Layout>
      <Routes>
          <Route path='/signin' element={<SignIn
            setUser={setUser}
          />} />
          <Route path='/:creatorId' element={<SurveysComponent user={user}/>} />
          <Route path='/editor' element={<Editor user={user}/>} />
          <Route path='/survey/:creatorId/:id' element={<Vote/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/home' element={<Home user={user} />} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </Layout>
  </Router>  
  </>
  );
}
function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}
export default App;
