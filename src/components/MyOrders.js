import { useEffect, useState } from "react"
import axios from 'axios'
import Loader from './Loader'
import Order from './Order'

function MyOrders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/cakeorders",
            method: "get",
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {
            setLoading(false)
            setOrders(response.data.cakeorders)
            // console.log(response.data.cakeorders)
        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }
    else {
        return (
            <>
                <br />
                <h2 style={{ textAlign: "center" }}>{localStorage.name} 's   ORDERS</h2>

                <br />
                <div className="accordion" id="accordionPanelsStayOpenExample">

                    {orders.map((order, num) => <Order order={order} key={order.orderid} id={num} />)}

                </div>
            </>

        )
    }
}

export default MyOrders