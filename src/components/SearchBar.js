import { useState } from 'react'
import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function SearchBar(props) {
    let [searchTerm, setSearchTerm] = useState('')
    const {term, handleSearch} = useContext(SearchContext)

    return (
        <form ref={term} onSubmit={(e) => props.handleSearch(e, searchTerm)}>

            <input type="text" placeholder="Enter a search term here" onChange={
                (e) => setSearchTerm(e.target.value)
            } />
            <button onClick={(e) => handleSearch(e, term.current.value)}>Submit</button>
            <input type="submit" />
        </form>
    )
}

export default SearchBar
