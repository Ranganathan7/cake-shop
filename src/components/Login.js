import axios from 'axios'
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import Loading from './Loading'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [user, setUser] = useState({email: "", password: "" })
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")
    const dispatch = useDispatch()
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.isLoggedIn) navigate("/cakes")
    }, [])

    function getEmail(event) {
        setUser((prevValue) => ({ ...prevValue, email: event.target.value }))
    }
    function getPassword(event) {
        setUser((prevValue) => ({ ...prevValue, password: event.target.value }))
    }
    function login() {
        setLoading(true)
        setErr("")
        setMsg("")
        axios({
            url: "https://apifromashu.herokuapp.com/api/login",
            method: "post",
            data: user
        }).then((response) => {
            setLoading(false)    
            if(response.data.message) setMsg(response.data.message)
            else{
                localStorage.isLoggedIn = true
                localStorage.name = response.data.name
                localStorage.role = response.data.role
                localStorage.email = response.data.email
                localStorage.token = response.data.token
                dispatch({type:"LOGIN"})
                navigate("/cakes")
            }
        }, (error) => {
            // console.log("error from api is ", error)
            setLoading(false)        
            setErr(error.message)
        })
        // setUser({email: "", password: "" })
    }



    return (
        <div className="row">
            <div className="col-8">
                <input type="email" onChange={getEmail} value={user.email} placeholder="Email" className="form-control" />
                <br></br>
                <input type="password" onChange={getPassword} value={user.password} placeholder="Password" className="form-control" />
                <br></br>
                <button onClick={login} className="btn btn-primary">Login</button>
            </div>
            <div className="col-4">
                {loading && <Loading />}
                {msg.length>0 && <h1 style={{textAlign: "center", color: "green"}}>{msg}</h1>}
                {err.length>0 && <h1 style={{textAlign: "center", color: "red"}}>{err}</h1>}
            </div>
        </div>
    )
}

export default Login