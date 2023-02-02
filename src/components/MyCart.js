import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import Loading from './Loading'
import axios from 'axios'
import CartTable from './CartTable'
import { useNavigate } from 'react-router-dom'
import EmptyCart from './EmptyCart'

function MyCart() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)
    let tc = 0
    let tq = 0

    function updateCakes() {
        axios({
            url: "https://apifromashu.herokuapp.com/api/cakecart",
            method: "get",
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {
            dispatch({ type: "UPDATE_CAKES", cakes: response.data.data })
            setLoading(false)
        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })
    }

    useEffect(() => {
        setLoading(true)
        if (isLoggedIn) {
            axios({
                url: "https://apifromashu.herokuapp.com/api/cakecart",
                method: "get",
                headers: {
                    Authorization: localStorage.token
                },
                withCredentials: true
            }).then((response) => {
                setLoading(false)
                dispatch({ type: "UPDATE_CAKES", cakes: response.data.data })
            }, (error) => {
                setLoading(false)
                console.log("error from add to cart api", error)
            })

        }
        else {
            setLoading(false)
            navigate("/login")
        }
    }, [])

    function addCake(cake) {

        setLoading(true)
        const requestobj = {
            name: cake.name,
            price: cake.price,
            image: cake.image,
            weight: cake.weight,
            cakeid: cake.cakeid
        }
        axios({
            url: "https://apifromashu.herokuapp.com/api/addcaketocart",
            method: "post",
            data: requestobj,
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {


            // navigate to cart
            // navigate("/my-cart")
            updateCakes()

        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })

    }

    function subtractCake(cake) {

        setLoading(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/removeonecakefromcart",
            method: "post",
            data: { cakeid: cake.cakeid },
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {
            // navigate to cart
            // navigate("/my-cart")
            updateCakes()

        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })

    }

    function removeCake(cake) {

        setLoading(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/removecakefromcart",
            method: "post",
            data: { cakeid: cake.cakeid },
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {
            // navigate to cart
            // navigate("/my-cart")
            updateCakes()

        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })

    }

    if (!loading && cakes && cakes.length === 0) return <EmptyCart />

    if (!loading) {
        return (
            <div>
                <table className="table table-striped" style={{ textAlign: "center" }}>

                    <thead>
                        <tr className="table-primary">
                            <th scope="col" colSpan="5"><h2>{localStorage.name}'s   CART</h2></th>
                            <td><button onClick={() => navigate("/cakes")} className="btn btn-info rounded-pill"><h6>Add More +</h6></button></td>
                        </tr>
                        <tr className="table-success">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price/Cake</th>
                            <th scope="col">Total Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cakes.map((each) => {
                                tq = tq + each.quantity
                                tc = tc + (each.price * each.quantity)
                                return <CartTable cake={each} key={each.cakeid} add={addCake} remove={removeCake} subtract={subtractCake} />
                            })
                        }

                    </tbody>


                </table>
                <div style={{height:"50px", width:"100%"}}>

                </div>
                <div className="position-fixed bottom-0" style={{width: "100%", marginBottom:"-1.5%"}}>
                    <table className="table table-striped" style={{ textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td colSpan="2" className="table-dark"><h4>TOTAL QUANTITY</h4></td>
                                <td className="table-info"><h4><strong>{tq}</strong></h4></td>
                                <td className="table-dark"><h4>TOTAL COST</h4></td>
                                <td className="table-info"><h4><strong>₹ {tc}</strong></h4></td>
                                <td colSpan="2">{cakes.length > 0 && <button onClick={() => navigate("/checkout")} className="btn btn-lg btn-primary">CHECK OUT</button>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    else {
        return (
            <Loading />
        )
    }
}

export default MyCart