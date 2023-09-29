import { Link } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import styled from "styled-components";
const imageUrl = import.meta.env.VITE_IMG;
import PropTypes from 'prop-types'

const Card = styled.div`
  width: 20%;
  color: white;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #1b1b1b; */
  box-shadow: 0 0 10px 5px rgba(0,0,0,.2);
  border: 1px solid #858585;
  border-radius: 3px;
  padding: 1rem;
  h2{
    font-size: 1.2rem;
  }
  p{
    font-size: .9rem;
  }
  p, h2, img{
    margin-bottom: .4rem;
  }
  img{
    max-width: 100%;
  }
  svg{
    color: #f7d354;
  }
  a {
    text-decoration: none;
    background-color: #ed6c02;
    border: 2px solid #ed6c02;
    border-radius: 4px;
    color: #000;
    padding: .6rem .5rem;
    text-align: center;
    font-weight: bold;
    font-size: .9rem;
    transition: all .2s;
  }
  a:hover {
    background-color: transparent;
    color: #ed6c02;
  }
`

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <Card>
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {parseFloat(movie.vote_average).toFixed(1)}
      </p>
      {showLink ? <Link to={`/movie/${movie.id}`}>Detalhes</Link> : <></>}
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object,
  showLink: PropTypes.bool
}

export default MovieCard