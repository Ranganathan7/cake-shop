import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import "./Address.css"
import Loader from './Loader'

function Address() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cakes, setValue } = useOutletContext()
    
    const [requestobj, setRequestobj] = useState({ phone: "", city: "", state: "", price: 0, name: localStorage.name, cakes: [], address: "", pincode: "" })
    const [loading, setLoading] = useState(false)

 

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        localStorage.progress = "w-50"
        setCakes()
        setPrice()
    }, [])

    function back() {
        setValue("w-25")
        navigate("/checkout/summary")
    }

    function next() {
        if (handleSubmit()) {
            setValue("w-75")
            navigate("/checkout/payment")
        }
    }

    function setName(e) {
        setRequestobj((prev) => ({ ...prev, name: e.target.value }))
    }

    function setPhone(e) {
        setRequestobj((prev) => ({ ...prev, phone: e.target.value }))
    }

    function setAddress(e) {
        setRequestobj((prev) => ({ ...prev, address: e.target.value }))
    }

    function setCity(e) {
        setRequestobj((prev) => ({ ...prev, city: e.target.value }))
    }

    function setState(e) {
        setRequestobj((prev) => ({ ...prev, state: e.target.value }))
    }

    function setPincode(e) {
        setRequestobj((prev) => ({ ...prev, pincode: e.target.value }))
    }

    function setCakes() {
        setRequestobj((prev) => ({ ...prev, cakes: cakes }))
    }

    function setPrice() {
        let tc = 0
        cakes.map(each => {
            tc = tc + (each.price * each.quantity)
        })
        setRequestobj((prev) => ({ ...prev, price: tc }))
    }

    function handleSubmit() {
        
        if (requestobj.price>0 && requestobj.cakes.length>0 && requestobj.phone.length > 0 && requestobj.name.length > 0 && requestobj.address.length > 0 && requestobj.state.length > 0 && requestobj.city.length > 0 && requestobj.pincode.length > 0) {
            setLoading(true)
            dispatch({ type: "UPDATE_ORDER", data: requestobj })
            setLoading(false)
            alert("data updated, proceed for payment")
            return true
        }
        else {
            alert("Please fill all the fields in the below form")
            return false
        }
    }

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <>
                <br />
                <div className="row grid justify-content-center">
                    <h2 style={{ textAlign: "center" }}>DELIVERY ADDRESS DETAILS</h2>

                    <form className="row g-3 col-8">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input onChange={setName} value={requestobj.name} type="text" className="form-control" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">+91</span>
                                <input onChange={setPhone} value={requestobj.phone} type="number" className="form-control" required />
                            </div>
                        </div>

                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input onChange={setAddress} value={requestobj.address} type="text" className="form-control" required />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">State</label>
                            <input onChange={setState} value={requestobj.state} type="text" className="form-control" required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <input onChange={setCity} value={requestobj.city} type="text" className="form-control" required />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Zip</label>
                            <input onChange={setPincode} value={requestobj.pincode} type="number" className="form-control" required />
                        </div>

            
                    </form>
                </div>
                <button onClick={back} className="btn btn-primary position-fixed bottom-0 start-0">&#60; back</button>
                <button onClick={next} className="btn btn-primary position-fixed bottom-0 end-0">next &#62;</button>
            </>
        )
    }
}

export default Address