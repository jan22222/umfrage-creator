import React, {useEffect} from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import LogOut from "./components/logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import Home from "./components/Home";
import Editoranswers from "./components/Editoranswers";
import Editorquestions from "./components/Editorquestions";
import Layout from "./components/Layout";
import Invitation from "./components/Invitation";
import SurveysComponent from "./components/SurveysComponent.js";
import Summary from "./components/Summary.js";
import Vote from "./components/voteSurvey.js";
import ForgotPw from "./components/ForgotPw";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase";
import { useSelector, useDispatch } from "react-redux";


function App() {

  return (
    <>
      <Router>
       
          <Layout>
            {
              <Routes>
                <Route path="/:creatorId" element={<SurveysComponent />} />
                <Route path="/editor" element={<Editor />} />
                <Route
                  path="/survey/:creatorId/:surveyId"
                  element={<Editorquestions />}
                />
                <Route
                  path="/survey/:creatorId/:surveyId/invitation"
                  element={<Invitation />}
                />
                <Route
                  path="/survey/:creatorId/:surveyId/:questionId"
                  element={<Editoranswers />}
                />
                <Route
                  path="/summary/:creatorId/:surveyId"
                  element={<Summary />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vote/:creatorId/:surveyId" element={<Vote />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            }
          </Layout>
      
      </Router>
    </>
  );
}
function NotFound() {
  return <>Ungültiger Pfad.</>;
}
export default App;
