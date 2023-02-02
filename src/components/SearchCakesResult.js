import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Cake from "./Cake"
import Loading from "./Loading"
import PageNotFound from "./PageNotFound"
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'

function SearchCakesResult() {

    const [query, setQuery] = useSearchParams()
    const [searchResults, setSearchResults] = useState([])
    const value = query.get("q")
    const [loading, setLoading] = useState(false)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.isLoggedIn) navigate("/login")
        setLoading(true)
        axios({
            method: "get",
            url: "https://apifromashu.herokuapp.com/api/searchcakes?q=" + value
        }).then((response) => {
            // console.log("response from search cakes api" , response.data)
            setLoading(false)
            setSearchResults(response.data.data)
        }, (error) => {
            console.log("Error from search cakes api", error)
        })
    }, [value])

    if (isLoggedIn) {
        return (
            <div>
                {loading ? <><br /><br /><Loading /></> :
                    <>
                        <h2> {searchResults.length} results found for "{value}"</h2>
                        <div className="row">
                            {
                                searchResults.map((each) => {
                                    return <Cake cake={each} key={each.cakeid} />
                                })
                            }
                        </div>
                    </>
                }
            </div>
        )
    }
    else {
        return (
            <PageNotFound />
        )
    }
}

export default SearchCakesResult