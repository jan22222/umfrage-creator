import react, {useContext} from "react"
import UserContext from "../App.js"


export default function Home(){
    const value = useContext(UserContext);
    react.useEffect(() => {
        console.log(value)

    },[])

    return(
        <>
            <h1>
                {value}
            </h1>
        </>
    )
}