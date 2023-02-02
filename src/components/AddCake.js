import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PageNotFound from './PageNotFound'
import {useNavigate} from 'react-router-dom'

function AddCake() {

    const [cake, setCake] = useState({})
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.isLoggedIn) navigate("/cakes")
    }, [])

    function setName(e) {
        setCake((prevValue) => ({ ...prevValue, name: e.target.value }))
    }
    function setPrice(e) {
        setCake((prevValue) => ({ ...prevValue, price: e.target.value }))
    }
    function setDescription(e) {
        setCake((prevValue) => ({ ...prevValue, description: e.target.value }))
    }
    function setFlavour(e) {
        setCake((prevValue) => ({ ...prevValue, flavour: e.target.value }))
    }
    function setId(e) {
        setCake((prevValue) => ({ ...prevValue, id: e.target.value }))
    }
    const setImage = (e) => {
        const file = e.target.files[0];
        setCake((prevValue)=>({...prevValue, image: URL.createObjectURL(file)}));
      };

    if (isLoggedIn) {
        return (
            <div className="row">
                <div className="col-6">
                    <h1 style={{ textAlign: "center" }}>ENTER THE CAKE DETAILS HERE</h1>
                    <div className="col-10" style={{ margin: "auto" }}>
                        <div className="mb-3">
                            <input type="file" onChange={setImage} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input onChange={setName} value={cake.name} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea onChange={setDescription} value={cake.description} className="form-control" rows="3"></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">₹</span>
                            <input onChange={setPrice} value={cake.price} type="number" className="form-control" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">ID</span>
                            <input onChange={setId} value={cake.id} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Flavour</label>
                            <input onChange={setFlavour} value={cake.flavour} type="text" className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <h1 style={{ textAlign: "center" }}>PREVIEW</h1>
                    <div className="card col-9" style={{ margin: "auto" }}>

                        {/* <a href={cake.image}>  */}
                        <img style={{ height: "18rem"}} src={cake.image} className="card-img-top" alt="YOUR CAKE" />
                        {/* </a>  */}
                        <div className="card-body">
                            <h5 className="card-title"><strong>{cake.name}</strong></h5>
                            <p className="card-text">{cake.description}</p>
                            <table>
                                <tr>
                                    <td><p className="card-text" style={{marginRight:"50px"}}><strong>Price</strong></p></td>
                                    <td><p className="card-text">{cake.price}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="card-text" style={{marginRight:"50px"}}><strong>Cake ID</strong></p></td>
                                    <td><p className="card-text">{cake.id}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="card-text" style={{marginRight:"50px"}}><strong>Flavour</strong></p></td>
                                    <td><p className="card-text">{cake.flavour}</p></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <PageNotFound />
        )
    }
}

export default AddCake