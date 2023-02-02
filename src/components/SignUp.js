import {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function SignUp(){
    const [user, setUser] = useState({name: "", email: "", password: "" })
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.isLoggedIn) navigate("/cakes")
    }, [])

    function getEmail(event) {
        setUser((prevValue) => ({ ...prevValue, email: event.target.value }))
    }
    function getName(event) {
        setUser((prevValue) => ({ ...prevValue, name: event.target.value }))
    }
    function getPassword(event) {
        setUser((prevValue) => ({ ...prevValue, password: event.target.value }))
    }
    function signup() {
        setErr("")
        setMsg("")
        axios({
            url: "https://apifromashu.herokuapp.com/api/register",
            method: "post",
            data: user,
            withCredentials: true
        }).then((response) => {
            // console.log("response from api is ", response.data)
            setMsg(response.data.message)
        }, (error) => {
            // console.log("error from api is ", error)
            setErr(error.message)
        })
        // setUser({name: "", email: "", password: "" })
    }



    return (
        <div className="row">
            <div className="col-8">
                <input type="text" onChange={getName} value={user.name} placeholder="Name" className="form-control" />
                <br></br>
                <input type="email" onChange={getEmail} value={user.email} placeholder="Email" className="form-control" />
                <br></br>
                <input type="password" onChange={getPassword} value={user.password} placeholder="Password" className="form-control" />
                <br></br>
                <button onClick={signup} className="btn btn-success">Sign Up</button>
            </div>
            <div className="col-4">
                {msg.length>0 && <h1 style={{textAlign: "center", color: "green"}}>{msg}</h1>}
                {err.length>0 && <h1 style={{textAlign: "center", color: "red"}}>{err}</h1>}
            </div>
        </div>
    )
}

export default SignUp