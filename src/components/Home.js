import react from "react"
import {onSnapshot} from "firebase/firestore";

import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

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
      <Box>{user.uid !== null ?<>
        <Typography gutterBottom variant="h2" component="h1">
                    Einladungen zu Umfragen
        </Typography>
            {invitations.map(function(data, index) {
                return (
                    <a href={data.link} style={{textDecoration: "none"}}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {index+1}. Einladung zur Umfrage "{data.title}"
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <p>Erstellt von {data.creatoremail}.</p>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                )
                })
            } 
                
                {invitations.length == 0 && 
                    
                        <p>
                            Seems to be empty!
                        </p>
                    
                }
            </>
            :
            <h1>
                Not logged in.
            </h1>}
      </Box>
           
        
    
    )
}