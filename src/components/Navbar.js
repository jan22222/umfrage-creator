import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/answers">Edit Answers</Link>
    </li>
    <li>
      <Link to="/questions">Edit Questions</Link>
    </li>
    <li>
      <Link to="/surveys">Edit Surveys</Link>
    </li>
    <li>
      <Link to="/signup">Signup</Link>
    </li>
    <li>
      <Link to="/logout">Logout</Link>
    </li>
  </div>
  );
}
export default navbar;