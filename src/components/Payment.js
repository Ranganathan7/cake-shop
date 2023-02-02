import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'

function Payment() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()
    const requestobj = useSelector(state => state.order)
    const [loading, setLoading] = useState(false)
    const { setValue } = useOutletContext()
    const dispatch = useDispatch()
    console.log(requestobj)
    useEffect(() => {
     
        if (!isLoggedIn) {
            navigate("/login")
        }
        if(requestobj===undefined) navigate("/my-cart")
        localStorage.progress = "w-75"
    })


    function back() {
        setValue("w-50")
        navigate("/checkout/address")
    }

    function next() {
        placeOrder()
    }

    function placeOrder() {

        setLoading(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/addcakeorder",
            method: "post",
            headers: {
                Authorization: localStorage.token
            },
            data: requestobj
        }).then((response) => {
            alert("ORDER PLACED SUCCESSFULLY")
            setLoading(false)
            dispatch({ type: "UPDATE_ORDER", data: {} })
            navigate("/my-orders")
        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })
    }

    if (loading) {
        return <Loader />
    }

    if(requestobj){
    return (
        <>
            <br />
            <h2 style={{ textAlign: "center" }}>ORDER DETAILS</h2>
            <br />
            <div className="row grid justify-content-center">
                <div className="col-8">
                    <table className="table table-striped-columns">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{requestobj.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone</th>
                                <td>+91 {requestobj.phone}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{requestobj.address}</td>
                            </tr>
                            <tr>
                                <th scope="row">State</th>
                                <td>{requestobj.state}</td>
                            </tr>
                            <tr>
                                <th scope="row">City</th>
                                <td>{requestobj.city}</td>
                            </tr>
                            <tr>
                                <th scope="row">PINCODE</th>
                                <td>{requestobj.pincode}</td>
                            </tr>
                            <tr>
                                <th scope="row">TOTAL PRICE</th>
                                <td><strong>Rs.</strong> {requestobj.price}</td>
                            </tr>
                            <tr>
                                <th scope="row">PAYMENT MODE</th>
                                <td><strong>COD</strong> (cash on delivery)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={back} className="btn btn-primary position-fixed bottom-0 start-0">&#60; back</button>
            <button onClick={next} className="btn btn-success btn-lg position-fixed bottom-0 end-0">PLACE ORDER</button>
        </>
    )
    }
    else{
        navigate("/my-cart")
    }
}

export default Payment