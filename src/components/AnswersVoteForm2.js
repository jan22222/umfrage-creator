import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { onSnapshot, setIndexConfiguration } from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  getCountFromServer,
  collection,
  updateDoc,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ErrorRadios(props) {
  const [answerText, setAnswerText] = React.useState("");
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [answerDocRefArray, setAnswerDocRefArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answerArray, setAnswerArray] = useState([]);
  const [answerColRef, setAnswerColRef] = useState();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userx) => {
    if (typeof userx != "undefined" && userx != null) {
      setUser(userx);
      setEmail(userx.email);
    } else {
      setUser(null);
      setEmail("");
    }
  });

  useEffect(() => {
    console.log("AnswersVoteForm");

    console.log("props.questionText", props.questionText);
    console.log("creatorId", props.creatorId);
    console.log("surveyId", props.surveyId);
    console.log("qId", props.questionId);
    console.log("props.questionDocRef", props.questionDocRef);
    console.log("creatorId", props.creatorId);
    console.log("surveyId", props.surveyId);

    const colRef3 = collection(props.questionDocRef, "answers");
    setAnswerColRef(colRef3);

    function wichtig() {
      return new Promise((resolve, reject) => {
        const docSnap = getDocs(colRef3);

        resolve(docSnap);
      });
    }

    async function loadDocRef(item) {
      console.log("item.id", item.id);
      console.log("colRef3", colRef3);

      const newDocRef = await doc(colRef3, item.id);
      return newDocRef;
    }
    wichtig()
      .then((res) => {
        console.log("docSnap to", props.questionId, "is", res);
        const help = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnswerArray(help);
        return help;
      })
      .then((help) => {
        const speichern = help.map((item) => {
          const docRef = loadDocRef(item);
          return docRef;
        });
        return Promise.all(speichern);
      })
      .then((speichern) => {
        setAnswerDocRefArray(speichern);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleRadioChange = (event) => {};

  const countVotesForAnswer = async (answerId) => {
    async function ngOnInit(colRef) {
      let snapshot = await getCountFromServer(colRef);
      let count = await snapshot.data().count;
      console.log("countVotesforAnswer", count);
      return count;
    }
    const colRef3 = answerColRef;
    const docRef3 = doc(colRef3, answerId);
    const colRef4 = await collection(docRef3, "votes");
    const count = await ngOnInit(colRef4);
    return count;
  };

  return (
    <>
      {isLoading && <p>Lädt...</p>}
      {!isLoading &&
        answerArray.map((item, index) => (
          <ControlUnit
            countVotesForAnswer={countVotesForAnswer}
            index={index}
            value={item.id}
            control={<Radio />}
            label={item.answer}
            answerDocRef={answerDocRefArray[index]}
          />
        ))}
    </>
  );
}

function ControlUnit(props) {
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    let wert = 0;
    props.countVotesForAnswer(props.value).then((erg) => {
      console.log("Controlunit initiiert Wert votes ist", erg);
      wert = erg;
      setVotes(wert);
    });
  }, []);
  return (
    <Card padding="max(20px,20%)">
      <Typography>Antwort {props.index + 1}:</Typography>
      <Typography variant="h6" component="div">
        {props.label}
      </Typography>
      <Typography sx={{ mb: 1.5 }}>Stimmen: {votes}</Typography>
    </Card>
  );
}
