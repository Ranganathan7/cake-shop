import { Link } from "react-router-dom"

function Cake(props) {

    return (
        <div className="card col-3" style={{ margin: "5px 0" }}>
            <Link to={"/cakes/" + props.cake.cakeid}>
                <img style={{ height: "14rem", cursor: "pointer" }} src={props.cake.image} className="card-img-top" alt={props.cake.id} />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{props.cake.name}</h5>
                <p className="card-text">Rs. {props.cake.price}</p>
            </div>
        </div>
    )

}

export default Cake

