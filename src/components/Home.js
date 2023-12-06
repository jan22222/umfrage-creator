import react from "react"
import {onSnapshot} from "firebase/firestore";

import { Box } from "@mui/material";

import { db } from '../firebase'
import {collection, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";

export default function Home(props){
   const userData = { uid: null};
   const [user, setUser] = react.useState(userData)
   const [invitations, setInvitations] = react.useState([])
   const [isLoading, setIsLoading] = react.useState(true);
   
   function loadInvitations(){
    const colRef = collection(db, "Invitations " + props.user.email)     
      const unsubscribe = onSnapshot(colRef, snapshot => {
        console.log("jet", snapshot)
          const newTimes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })
        );
        setInvitations(newTimes);
        console.log("invitations", newTimes)
      });
      return null
   }

 function userLoad(){
    if(props.user===undefined){
        setUser(userData)
    }else{
        setUser(props.user)
    }
    return user
}
   react.useEffect(()=>{
    
    userLoad()
    loadInvitations()
    setIsLoading(false) 

   },[props.user])

    return(
        <> {user.uid !== null ?
            
            
            <h1>
                Logged in with user id {user.uid}
                <p>
                    and Email {user.email}
                </p>
                <p>
                    Invitations:
                </p>
                {invitations.length == 0 && 
                    
                        <p>
                            Seems to be empty!
                        </p>
                    
                }
                
                {invitations.map(function(data, index) {
                    return (
                        <div>
                            {index+1}:  <a href={data.link}>{data.link}</a>
                        </div>
                    )
                    })
                } 
            </h1>:
            <h1>
                Not logged in.
            </h1>
           }
        
        </>
    )
}