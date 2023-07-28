import react from "react"

export default function Home({user}){
    react.useEffect(() => {
        console.log(user)

    },[])

    return(
        <>
            <h1>
                {user.email ? "You are logged in with the email" : "You are not logged in."} 
                <p>{user.email ? user.email : ""}</p>

            </h1>
        </>
    )
}