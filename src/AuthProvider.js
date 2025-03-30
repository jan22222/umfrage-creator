// AuthProvider.js
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "./firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("")
  const [userPhotoURL, setUserPhotoURL] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  async function loginUser (email, password) {
    await setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then(res=>{
        setIsLoggedIn(true)
        setLoading(false)
        return res;
    }).catch(
        error => {
            console.log(error)
        }
    )
  };

  const logOut = async () => {
    const so = await signOut(auth);
    await setLoading(true);
    await setUserEmail("")
    return so
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserId(currentUser.uid)
      setUserEmail(currentUser.email)
      setUserDisplayName(currentUser.displayName)
      setUserPhotoURL(currentUser.photoURL)  
      setEmailVerified(currentUser.emailVerified)
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    createUser,
    user,
    userId,
    userDisplayName,
    userEmail,
    userPhotoURL,
    userPhotoURL,
    loginUser,
    logOut,
    loading,
    isLoggedIn
  };


  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;