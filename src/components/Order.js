function Order(props) {

    const order = props.order
    

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={props.id + "Heading"}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse" + props.id} >
                    <strong>ORDER #{props.id + 1} - {order.orderid}</strong>
                </button>
            </h2>
            <div id={"panelsStayOpen-collapse" + props.id} className="accordion-collapse collapse" >
                <div className="accordion-body">
                    <div className="row grid justify-content-center">
                        <div className="col-8">
                            <table className="table table-striped-columns">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>{order.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone</th>
                                        <td>+91 {order.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address</th>
                                        <td>{order.address}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">City</th>
                                        <td>{order.city}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">PINCODE</th>
                                        <td>{order.pincode}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">TOTAL PRICE</th>
                                        <td><strong>Rs.</strong> {order.price}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">PAYMENT MODE</th>
                                        <td><strong>COD</strong> (cash on delivery)</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DATE & TIME</th>
                                        <td>{order.orderdate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <table className="table table-striped" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="6"><h2>ORDERED ITEMS</h2></th>
                                </tr>
                                <tr className="table-success">
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Weight</th>
                                    <th scope="col">Price/Cake</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.cakes.map((each, num) => {

                                        return (
                                            <tr key={num}>
                                                <td><img style={{ height: "50px", width: "50px" }} src={each.image} alt={each.id} /></td>
                                                <td><p>{each.name}</p></td>
                                                <td><p>{each.quantity}</p></td>
                                                <td><p><strong>{each.weight} kg</strong></p></td>
                                                <td><p><strong>Rs.</strong> {each.price}</p></td>
                                                <td><p><strong>Rs.</strong> {each.price * each.quantity}</p></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>


                        </table>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Order