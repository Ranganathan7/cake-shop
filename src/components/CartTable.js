
function CartTable(props) {
    const value=props.cake.quantity!==1?"btn-danger":"btn-secondary disabled"

    return (
        <tr>
            <td><img style={{ height: "50px", width: "50px" }} src={props.cake.image} alt={props.cake.id} /></td>
            <td><p>{props.cake.name}</p></td>
            <td><p><button onClick={()=>props.subtract(props.cake)} className={"btn btn-sm "+value} style={{ margin: "5px" }}>-</button>{props.cake.quantity}<button onClick={()=>props.add(props.cake)} className="btn btn-success btn-sm" style={{ margin: "5px" }}>+</button></p></td>
            <td><p><strong>Rs.</strong> {props.cake.price}</p></td>
            <td><p><strong>Rs.</strong> {props.cake.price * props.cake.quantity}</p></td>
            <td><button onClick={()=>props.remove(props.cake)} className="btn btn-warning btn-sm">REMOVE</button></td>
        </tr>
    )



}

export default CartTable