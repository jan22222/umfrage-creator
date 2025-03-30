import React, {useEffect} from "react";
import SC from "./SurveysComponent";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";


import  auth  from "../firebase";
export default function Editor() {

  return (

    <Card padding="max(20px,20%)">
      {/* {loading ? (
        <div
          style={{
            height: "50%",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : ( */}
        <>
          <h1 style={{ display: "block" }}>Your Surveys</h1>
          <SC />
        </>
      {/* )} */}
    </Card>
  );
} //close main
