import {useNavigate} from 'react-router-dom'

function EmptyCart(){
    const navigate = useNavigate()
    return (
        <div className="container" style={{textAlign: "center", color: "blue", marginTop: "100px"}}>
            {/* <img src="/404.jpg" style={{width:"100%"}} className="image-fluid" alt="404 image"></img>*/}
            <h1>THERE'S NOTHING TO DISPLAY IN YOUR CART</h1>
            <br />
            <button onClick={()=>navigate("/cakes")} className="btn btn-outline-info btn-lg">ADD CAKES</button>
        </div>
    )
}

export default EmptyCart