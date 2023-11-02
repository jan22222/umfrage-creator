import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
 
const Home = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).catch((error) => {
        // An error happened.
        });
    }
   
    return(
        <>
            <nav>
                <p>
                    Zum Logout auf Button klicken.
                </p>
 
                <div>
                    <form>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </form>
        		</div>
            </nav>
        </>
    )
}
 
export default Home;