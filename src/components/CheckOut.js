import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'

function CheckOut(props) {

    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const cakes = useSelector(state => state.cakes)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [value, setValue] = useState("w-25")
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        if(cakes.length===0) navigate("/cakes")
        setLoading(true)
        axios({
            url: "https://apifromashu.herokuapp.com/api/cakecart",
            method: "get",
            headers: {
                Authorization: localStorage.token
            },
            withCredentials: true
        }).then((response) => {
            dispatch({type:"UPDATE_CAKES", cakes: response.data.data})
            setLoading(false)
            
        }, (error) => {
            setLoading(false)
            console.log("error from add to cart api", error)
        })
        if(localStorage.progress && localStorage.progress!=='w-x') setValue(localStorage.progress)
        return(()=>{
            localStorage.progress='w-x'
        })
    }, [])


    if (loading) {
        return <Loader />
    }
    else {
        return (
            <>
                <div className="progress">
                    <div className={"progress-bar " + value}></div>
                </div>
                <Outlet context={{setValue: setValue, cakes: cakes}} />


            </>
        )
    }
}

export default CheckOut