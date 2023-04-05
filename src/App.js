import React from 'react';
import './App.css';
import SignUp from './components/SignUp';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path='/signup' element={<SignUp/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}
function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}
export default App;
