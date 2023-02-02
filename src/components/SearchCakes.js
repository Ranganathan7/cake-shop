import { useNavigate } from "react-router-dom"
import { useState } from  "react"

function SearchCakes() {
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()

    function getSearchText(event) {
        setSearchText(event.target.value)
    }

    function searchCakes() {
        if (searchText.length > 0) {
            const path = "/search?q=" + searchText
            navigate(path)
            setSearchText("")
        }
    }

    return (
        <div className="d-flex" role="search">
            <input onChange={getSearchText} className="form-control me-2" value={searchText} type="search" placeholder="Search Cakes" aria-label="Search" />
            <button onClick={searchCakes} className="btn btn-outline-light">Search</button>
        </div>
    )
}

export default SearchCakes