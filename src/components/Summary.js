import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Summary() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const { cakes, setValue } = useOutletContext()
    let tq = 0
    let tc = 0

    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        localStorage.progress = "w-25"
    }, [])

    function back() {
        setValue("w-0")
        navigate("/my-cart")
    }

    function next() {
        setValue("w-50")
        navigate("/checkout/address")
    }

    return (
        <>
            <div>
                <table className="table table-striped" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th scope="col" colSpan="6"><h2>SUMMARY</h2></th>
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
                            cakes.map((each, num) => {
                                tq = tq + each.quantity
                                tc = tc + (each.price * each.quantity)
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
                        <tr>
                            <td colSpan="2" className="table-dark"><h4>TOTAL QUANTITY</h4></td>
                            <td className="table-info"><h4><strong>{tq}</strong></h4></td>
                            <td colSpan="2" className="table-dark"><h4>TOTAL COST</h4></td>
                            <td className="table-info"><h4><strong>₹ {tc}</strong></h4></td>
                        </tr>
                    </tbody>


                </table>
            </div>
            <button onClick={back} className="btn btn-warning position-fixed bottom-0 start-0">&#60; My Cart</button>
            <button onClick={next} className="btn btn-primary position-fixed bottom-0 end-0">next &#62;</button>
        </>
    )
}

export default Summary