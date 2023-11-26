import react from "react"

export default function Home(props){
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
        <> {user.uid !== null ?
            
            
            <h1>
                Logged in with user id {user.uid}
            </h1>:
            <h1>
                Not logged in.
            </h1>
           }
        
        </>
    )
}