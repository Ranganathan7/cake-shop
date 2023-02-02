import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import Loading from "./Loading"
import PageNotFound from './PageNotFound'
import { useSelector } from 'react-redux'
import Loader from './Loader'

function CakeDetails() {
  const params = useParams()
  const [cake, setCake] = useState()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!localStorage.isLoggedIn) navigate("/cakes")
    axios(({
      method: "get",
      url: "https://apifromashu.herokuapp.com/api/cake/" + params.cakeid,
      withCredentials: true
    })).then((response) => {
      setCake(response.data.data)
    }, (error) => { console.log(error) })
  }, [])

  function addToCart() {
    setLoading(true)
    if (localStorage.token) {
      const requestobj = {
        name: cake.name,
        price: cake.price,
        image: cake.image,
        weight: cake.weight,
        cakeid: cake.cakeid
      }
      // hit the api 
      axios({
        url: "https://apifromashu.herokuapp.com/api/addcaketocart",
        method: "post",
        data: requestobj,
        headers: {
          Authorization: localStorage.token
        },
        withCredentials: true
      }).then((response) => {
        setLoading(false)
        if (response.data.data) {
          // navigate to cart
          // navigate("/my-cart")
          setModal(true)
        }
        else {
          setModal(true)
        }
      }, (error) => {
        setLoading(false)
        console.log("error from add to cart api", error)
      })

    }
    else {
      setLoading(false)
      navigate("/login")
    }
    
  }

  if (loading) {
    return (
      <Loader />
    )
  }

  if (isLoggedIn && cake) {
    return (
      <>
        {modal && <div className="position-relative">
          <div className="alert alert-success alert-dismissable" role="alert">
            Successfully added the Cake! Go to My Cart to BUY NOW!!
            <div className="position-absolute top-0 end-0" style={{marginTop: "10px"}}>
            <button onClick={()=>navigate("/my-cart")} className="btn btn-sm btn-primary" style={{marginLeft: "10px"}}>My Cart</button>
            <button onClick={()=>{setModal(false);navigate("/cakes")}} className="btn-close" style={{marginLeft: "10px"}}></button>
            </div>
          </div>
        </div>}

        <div className="container mt-4">
          <h1>{cake.name}</h1>
          <section className="cake-details mb-5 pt-4 pb-4">
            <div className="col-md-12 row">
              <div className="col-md-5 mb-4 mb-md-0">
                <div className="mdb-lightbox">
                  <div className="row product-gallery mx-1">
                    <div className="col-12 mb-0">
                      <div className="view rounded z-depth-1 main-img">
                        <a href={cake.image} data-size="710x823">
                          <img src={cake.image} alt={cake.name} className="img-fluid z-depth-1" style={{ width: "100%" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <h5>{cake.name}</h5>
                <p className="mb-2 text-muted text-uppercase small">{cake.reviews} reviews</p>

                <p><span className="mr-1"><strong>₹{cake.price}</strong></span></p>
                <p className="pt-1">{cake.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="pl-0 w-25" scope="row"><strong>Flavour</strong></th>
                        <td>{cake.flavour}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row"><strong>Ingredients</strong></th>
                        <td>{cake.ingredients?.join()}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row"><strong>Occasion</strong></th>
                        <td>{cake.type}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row"><strong>Weight</strong></th>
                        <td>{cake.weight} kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                
                {!modal && <button type="button" onClick={addToCart} className="btn btn-lg btn-warning btn-md mr-1 mb-2"><i className="fas fa-shopping-cart pr-2"></i>Add to Cart</button>}
                {modal && <button type="button" onClick={()=>navigate("/cakes")} className="btn btn-lg btn-warning btn-md mr-1 mb-2" style={{marginRight:"10px"}}><i className="fas fa-shopping-cart pr-2"></i>&#8672; BACK</button>}
                {modal && <button type="button" onClick={()=>navigate("/my-cart")} className="btn btn-lg btn-success btn-md mr-1 mb-2"><i className="fas fa-shopping-cart pr-2"></i>BUY NOW</button>}
              </div>
            </div>

          </section>
        </div>
      </>
    )
  }
  else {
    if (isLoggedIn && cake !== null) {
      return (
        <>
          <br /><br />
          <Loading />
        </>
      )
    }
    else {
      return (
        <PageNotFound />
      )
    }
  }

}

export default CakeDetails