import react from "react";
import { onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [invitations, setInvitations] = react.useState([]);
  const [isLoading, setIsLoading] = react.useState(true);
  const [isLoggedIn, setIsloggedIn] = react.useState(false);
  const [email, setEmail] = react.useState("");

  function loadInvitations(user) {
    console.log(user);
    console.log(user.email);

    const colRef = collection(db, "Invitations " + user.email);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      console.log("jet", snapshot);
      const newTimes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitations(newTimes);
      console.log("invitations", newTimes);
      //add a watched field to each doc
      const data = {
        watched: true,
      };
      invitations.map((inv) => {
        let docRef = doc(colRef, inv.id);
        updateDoc(docRef, data);
      });
    });
    return null;
  }

  react.useEffect(() => {
    //
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setIsloggedIn(true);
      setEmail(user.email);
      console.log("hi");
      loadInvitations(user);
    }
  });

  return (
    <Paper sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        {isLoggedIn ? (
          <>
            <h1>Willkommen, {email}</h1>

            <h1>Invitations</h1>
            {invitations.length === 0 ? (
              <h1>empty</h1>
            ) : (
              invitations.map(function (data, index) {
                return (
                  <a href={data.link} style={{ textDecoration: "none" }}>
                    <Card sx={{ width: "100%" }}>
                      <CardActionArea sx={{ width: "100%" }}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {index + 1}. Einladung zur Umfrage "{data.title}"
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <p>Erstellt von {data.creatoremail}.</p>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </a>
                );
              })
            )}
          </>
        ) : (
          <>Sie sind ausgeloggt.</>
        )}
      </Stack>
    </Paper>
  );
}
