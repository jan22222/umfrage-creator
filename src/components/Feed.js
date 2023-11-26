import react from "react"
import {Stack} from '@mui/material';

export default function Feed(props){
    return(
        <Stack width="100%" minWidth="1000px" direction="row" justifyContent="center" width="100%" paddingTop="40px">
            {props.children}        
        </Stack>       
    )
}