import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {Button} from "@mui/material"
 
const Home = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth)
            .then((res)=>{navigate("../signin")})
            .catch((error) => {
                alert(error.message)
            });
    }
   
    return(
        <>
            <nav>
                <p>
                    Zum Logout auf den Button klicken.
                </p>
 
                <div>
                    <Button  variant="contained" size="large" onClick={handleLogout}>
                        Logout
                    </Button>
        		</div>
            </nav>
        </>
    )
}
 
export default Home;