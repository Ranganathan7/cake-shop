import { useParams, Link } from "react-router-dom"
import PageNotFound from './PageNotFound'

function UserDetails(props) {
    const params = useParams()
    const token = params.token

    if (token!=='undefined' && token === localStorage.token) {
        return (
            <>
                <h1 style={{ textAlign: "center" }}>MY DETAILS</h1>
                <div className="card" style={{ width: "18rem", margin: "auto" }}>
                    <div className="card-body">
                        <h5 className="card-title">{localStorage.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{localStorage.role}</h6>
                        <p className="card-text">{localStorage.email}</p>
                        <Link to="/my-orders" className="card-link">MY ORDERS</Link>
                        <Link to="/my-cart" className="card-link">MY CART</Link> 
                    </div>
                </div>
            </>
        )
    }
    else{
        return(
            <PageNotFound />
        )
    }

}

export default UserDetails