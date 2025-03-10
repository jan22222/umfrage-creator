import react, { useEffect } from "react"
import NavList from "./NavList";
import Box from '@mui/material/Box';
import {AppBar, Switch, Stack, Typography, Badge, } from '@mui/material';
import {makeStyles} from "@mui/styles";
import {styled} from "@mui/material/styles"
import Brightness6Icon from '@mui/icons-material/Brightness6';
import MailIcon from '@mui/icons-material/Mail';
import {onSnapshot, setIndexConfiguration} from "firebase/firestore";
import { db } from '../firebase'
import {collection, updateDoc, addDoc, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";


const useStyles = makeStyles({
    page:{
        width: "calc(100vw - 320px)",
        marginLeft : "300px",
        background: "#f9f9f9"
    },
    drawer:{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap:"3px"
    },
    abRoot: {
        backgroundColor: "red"
    },
    abStatic: {
    
    }
})

const StyledStack = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px"
}))

export default function Topbar(props){
    const classes = useStyles()
    const [checked, setChecked] = react.useState(false)
    const [batchCounter, setBatchCounter] = react.useState(0);

    useEffect(()=>{
      console.log("topbar useEffect")
      const colRef = collection(db, "Invitations " + props.user.email)     
          const unsubscribe = onSnapshot(colRef, snapshot => {
            console.log("jet", snapshot)
              const newTimes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })
            );
            newTimes.forEach((el)=>{
              console.log(el)
              if(el.watched === undefined){
                setBatchCounter(batchCounter+1)
              }
            })
    })},[])

    function handleChange(){
      
      if (props.mode === "dark"){
        props.setMode("light")
       
        console.log("light")
      }else{
        props.setMode("dark")
        console.log("dark")
      }
      setChecked(!checked)
    }

    return(
    
        <Box>
             <AppBar    user={props.user}     position="static"
                style={{ height: "120px", background: "secondary", width:"100vw",
                  fontSize: '1.2rem',
                  
                }}
                classes={{ 
                    root: classes.abRoot, 
                    positionStatic: classes.abStatic 
                }}>
                 <StyledStack> 
                    <Typography    sx={{ width: {xs: 150, md: 600}, fontFamily: 'Raleway', fontSize: {xs: "24px" , md: "52px"}}}>
                        Umfragen-Creator App
                    </Typography>
                    <>
                        {props.user.uid !== null ?
                          <Typography    sx={{fontFamily: 'Raleway', fontSize: "24px"}}>
                            <p>{props.user.email}</p>
                          </Typography>
                              :
                          <Typography    sx={{fontFamily: 'Raleway', fontSize:"24px"}}>
                            <p>Ausgeloggt.</p>
                          </Typography>
                        }
                    </>
                    <StyledStack>
                      <a href="/">
                        <Badge badgeContent={batchCounter} color="secondary">
                          <MailIcon color="action" />
                        </Badge>
                      </a>
                      <Brightness6Icon/>
                      <Switch
                        color="warning"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </StyledStack>
                 </StyledStack>
             </AppBar>
        </Box>
    )
}