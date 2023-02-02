import { Link, useNavigate } from 'react-router-dom'
import SearchCakes from './SearchCakes'
import {useSelector, useDispatch} from 'react-redux'
// import {useEffect, useState} from 'react'
// import axios from 'axios'

function Navbar() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [number, setNumber] = useState(0)
    function login(){
        navigate("/login")
    }

    // useEffect(()=>{
    //     axios({
    //         url: "https://apifromashu.herokuapp.com/api/cakecart",
    //         method: "get",
    //         headers: {
    //             Authorization: localStorage.token
    //         }
    //     }).then((response) => {
    //         setNumber(response.data.data.length)
    //     }, (error) => {
    //         console.log("error from add to cart api", error)
    //     })
    // }, [])

    function logout(){
        localStorage.clear()
        dispatch({type:"LOGOUT"})
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Ranganathan's Bakery</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            {!isLoggedIn && <Link className="nav-link" to="/signup">SignUp</Link>}
                            {isLoggedIn && <Link className="nav-link" to="/cakes">Cakes</Link>}
                            <div className="position-relative">
                               
                            {isLoggedIn && <Link className="nav-link" to="/my-cart">My Cart</Link>}
                            
                            {/* <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">{number}</div> */}
                            </div>
                        </div>
                    </div>
                    {isLoggedIn && <SearchCakes />}
                    {!isLoggedIn && <button onClick={login} className="btn btn-warning btn-lg" style={{marginLeft: "30px"}}>LOG IN</button>}
                    {isLoggedIn && <button onClick={() => navigate("/user/"+localStorage.token)} className="btn btn-primary" style={{marginLeft: "30px", borderRadius: "100%"}}>ME</button>}
                    {isLoggedIn && <button onClick={logout} className="btn btn-danger" style={{marginLeft: "10px"}}>LOG OUT</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar