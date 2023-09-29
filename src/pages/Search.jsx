import styled from "styled-components"
import Navbar from "../components/Navbar"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Container = styled.div`
  padding: 90px 50px;
  .movies-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  .title{
    text-align: center;
    font-size: 1%.6;
  }
  .title .query-text{
    color: #F7D354;
  }
`

const Search = () => {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  const query = searchParams.get('q')

  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)
  }
  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`

    getSearchedMovies(searchWithQueryUrl)
  }, [query])


  return ( 
    <>
      <Navbar />
      <Container>
        <h2 className='title'>Resultados para: <span className="query-text">{query}</span></h2>
        <div className="movies-container">
          {movies.length > 0 && movies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </div>
      </Container>
    </>
  )
}

export default Search