import react from "react"
import {Stack} from '@mui/material';

export default function Feed(props){
    return(
        <Stack width="100%" direction="row"   paddingTop="40px"
            sx={{justifyContent: {xs:"flex-start", md: "center"}}}
        >
            {props.children}        
        </Stack>       
    )
}