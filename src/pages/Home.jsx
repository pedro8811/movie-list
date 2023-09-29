import styled from 'styled-components'
import './App.css'
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar';
import { Pagination } from '@mui/material';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Container = styled.div`
  color: white;
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
    font-size: 1.6rem;
  }
  .title .query-text{
    color: #F7D354;
  }
  .pagination{
    display: flex;
    justify-content: center;
    nav{
      ul{
        li{
          button, div{
            font-family: Inter;
            color: white;
          }
        }
      }
    }
  }
`

function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [pages, setPages] = useState()
  const [page, setPage] = useState(1)

  const handleChange = (event, value) => {
    setPage(value)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Para uma animação suave de rolagem
    });
  };

  useEffect(() => {
    scrollToTop()
  }, [page])

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setTopMovies(data.results)
    setPages(data)
  }
  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}&page=${page}`
    // const topRatedUrl = `https://api.themoviedb.org/3/discover/movie?${apiKey}&language=en-US&sort_by=popularity.desc&page=1&primary_release_date.lte=2000-01-01`
    getTopRatedMovies(topRatedUrl)
  }, [page])

  return (
    <>
      <Navbar />
      <Container>
        <h2 className='title'>Melhores filmes</h2>
        <div className="movies-container">
          {topMovies.length > 0 && topMovies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </div>
        <div className='pagination'>
          <Pagination count={10} color='primary' page={page} onChange={handleChange} />
        </div>
      </Container>
    </>
  )
}

export default Home
