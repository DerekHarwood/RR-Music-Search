import { useEffect, useState, Suspense,  useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner'

function App() {
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='    
    
    const handleSearch = (e, term) => {
        e.preventDefault()
      if(term){
        setData(fetchData(term));
       }
    }

    const renderGallery = () => {
        if(data){
            return (
                <Suspense fallback={<Spinner />} >
                    <Gallery data={data} />
                </Suspense>
            )
        }


    
    return (
        <div className="App">
            {message}
            {renderGallery()}

            <SearchContext.Provider value={{
                term: searchInput
                }}>
                <SearchBar handleSearch={handleSearch} />
            </SearchContext.Provider>
           
            <DataContext.Provider value={data}>
                <Gallery />
            </DataContext.Provider>
        </div>
    );
}}

export default App