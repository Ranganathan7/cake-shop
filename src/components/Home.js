import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

function Home() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    return (
        <>
            <div className="d-grid gap-2 col-6 mx-auto">
                <br />
                {/*<button className="btn btn-outline-primary" type="button" onClick={()=>navigate("/signup")}>Sign Up</button>
            <button className="btn btn-outline-success" type="button" onClick={()=>navigate("/login")}>Login</button>
            <button className="btn btn-outline-danger" type="button" onClick={()=>navigate("/cakes")}>Get Cakes</button> */}
                <img src="bakery.jfif" alt="bakery" style={{ width: "100%" }} />
            </div>
            <br />
            {!isLoggedIn && <Link to="/login">
                <h3 style={{ textAlign: "center", color: "BLUE" }}>LOG IN TO EXPLORE MY BAKERY</h3>
            </Link>}
            {isLoggedIn && <Link to="/add-cake">
                <h3 style={{ textAlign: "center", color: "BLUE" }}>ADD A CAKE</h3>
            </Link>}
        </>
    )
}

export default Home