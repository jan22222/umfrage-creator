import { makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import react from "react"
import Navbar from "./Navbar.js"
const useStyles = makeStyles({
    page:{
        width: "calc(100vw - 320px)",
        marginLeft : "300px",
        background: "#f9f9f9"
    },
    drawer:{
        width: "300px"
    },
        abRoot: {
          backgroundColor: "red"
        },
        abStatic: {
        
        }
   
})

export default function Layout(props){
    const classes = useStyles()


    const userData = { uid: null};
    const [user, setUser] = react.useState(userData)
 
    react.useEffect(()=>{
     if(props.user===undefined){
         setUser(userData)
     }else{
         setUser(props.user)
     }
        
    },[props.user])
 
     
    return(
        <div>
            <AppBar    user={props.user}     position="static"
                style={{ height: "80px", background: "secondary", marginLeft:"230px" }}
                classes={{ 
                root: classes.abRoot, 
                positionStatic: classes.abStatic 
                }}>
                 <> {user.uid !== null ?
             
             
             <h1>
                 Logged in with user id {user.uid}
             </h1>:
             <h1>
                 Not logged in.
             </h1>
            }
         
         </>
            </AppBar>
            <Drawer
             variant = "permanent"
             anchor = "left"
             className = {classes.drawer}
            >
               Menu
               <Navbar></Navbar>
            </Drawer>
            <div className = {classes.page} >
                {props.children}        
            </div>       
        </div>
    )
}