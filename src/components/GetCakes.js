import axios from 'axios'
import { useState, useEffect } from 'react'
import Cake from './Cake'
import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux'
import PageNotFound from './PageNotFound'
import { useNavigate } from 'react-router-dom'

function GetCakes() {

    const [cakes, setCakes] = useState([])
    // const [btn_pressed, set_btn_pressed] = useState(false)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.allcakes)

    function getCakes() {
        // set_btn_pressed(true)
        if (!data) {
            axios({
                url: "https://apifromashu.herokuapp.com/api/allcakes",
                method: "get",
            }).then((response) => {
                setCakes(response.data.data)
                dispatch({ type: "CAKES", cakes: response.data.data })
        }, (error) => {
            console.log("error from api is ", error)
        })
    }
    else {
        setCakes(data)
    }
}

// function removeCakes(){
//     setCakes([])
//     set_btn_pressed(false)
// }

useEffect(() => {
    if (!localStorage.isLoggedIn) navigate("/login")
    getCakes()
}, [])

if (isLoggedIn) {
    return (
        <div>
            {/* <div className="d-grid gap-2 col-6 mx-auto">
                <br />
                <button className="btn btn-warning" type="button" onClick={getCakes}>DISPLAY ALL CAKES</button>
                <button className="btn btn-danger" type="button" onClick={removeCakes}>HIDE ALL CAKES</button>
            </div> */}
            <br></br>
            {/* {btn_pressed && cakes.length===0 && <Loading />} */}
            {cakes.length === 0 && <Loading />}
            <div className="row">
                {
                    cakes.map((cake) => {
                        // console.log(cake)
                        return <Cake cake={cake} key={cake.cakeid} />
                    })
                }
            </div>
        </div>
    )
}
else {
    return <PageNotFound />
}
}

export default GetCakes