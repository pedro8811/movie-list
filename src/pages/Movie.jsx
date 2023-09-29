import styled from "styled-components"
import Navbar from "../components/Navbar"
import { BsPersonHeart } from 'react-icons/bs'
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Tooltip } from "@mui/material"

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG;

const Container = styled.div`
  color: white;
  padding: 90px 180px;
`

const Card = styled.main`
  padding: 30px;
  /* background: #2b2b2b;
  box-shadow: 0 0 10px 5px rgba(0,0,0,.2); */
  display: flex;
  color: #c7c7c7;
  .left-container{
    display: flex;
    flex-direction: column;
    img{
      box-shadow: 0 0 5px 5px rgba(0,0,0,.5);
      border: 1px solid #858585;
      border-radius: 3px;
      max-width: 250px;
    }
    .infos{
      display: flex;
      justify-content: center;
      margin-top: .5rem;
      font-size: .8rem;
      span{
        display: flex;
        align-items: center;
      }
    }
  }
  .right-container{
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    .movie-main-info{
      font-size: 1rem;
      .title{
        font-size: 1.9rem;
        color: white;
        font-family: 'Merriweather';
      }
      .post-title{
        font-weight: 300;
        .year, .director{
          border-bottom: 1px solid #c7c7c7;
        }
        .year:hover, .director:hover{
          color: #e0e0e0;
          cursor: pointer;
        }
      }
    }
    .tagline{
      font-size: .9rem;
      text-transform: uppercase;
      font-weight: 300;
    }
    p{
      font-size: .9rem;
      margin: 10px 0;
      font-weight: 400;
    }
    .sub-title{
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      h2{
        font-size: 1.2rem;
        font-weight: 300;
        margin-right: 10px;
      }
      div{
        background-color: #9c9c9c;
        height: 1%;
        width: 80%;
      }
    }
    .cast{
      display: flex;
      flex-wrap: wrap;
      span{
        font-size: .75rem;
        margin: 5px;
        padding: 3px;
        background: #2e2e2e;
        border-radius: 3px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      span:hover{
        color: white;
        cursor: pointer;
      }
      font-size: .8rem;
    }
    .table-crew{
      font-size: .9rem;
      .table-row{
        display: flex;
        td{
          @media screen and (min-width: 1600px) and (max-width: 1920px){
            width: 20%;
          }
          width: 40%;
        }
        .names{
          display: flex;
          flex-wrap: wrap;
          p{
            font-size: .75rem;
            margin: 5px;
            padding: 3px;
            background: #2e2e2e;
            border-radius: 3px;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          p:hover{
            color: white;
            cursor: pointer;
          }
        }
      }
    }
  }
`

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [crew, setCrew] = useState({})
  const [cast, setCast] = useState({})

  function extrairAno(dataString) {
    const partes = dataString.split("-");
    const ano = partes[0];
    return parseInt(ano, 10);
  }

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json();
    setMovie(data)
  }
  const getCredits = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setCrew(data.crew)
    setCast(data.cast)
  }
  getCredits(`https://api.themoviedb.org/3/movie/${id}/credits?${apiKey}`)

  function encontrarMembros(arr, job) {
    const membrosComCargo = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === job) {
        membrosComCargo.push(arr[i]);
      }
    }
    return membrosComCargo.length > 0 ? membrosComCargo : null;
  }

  useEffect(() => {
  }, [])

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`
    getMovie(movieUrl)
  }, [])

  // vote_average, runtime, popularity

  const dezPrimeirosCast = cast.length > 0 ? cast.slice(0, 18).map(obj => obj) : <></>

  return (
    <>
      <Navbar />
      <Container>
        {movie
          ?
          <Card>
            <div className="left-container">
              <img src={imageUrl + movie.poster_path} />
              <div className='infos'>
                <span>
                  <AiOutlineClockCircle /> &nbsp;
                  {movie.runtime} mins |&nbsp;
                  <BsPersonHeart /> &nbsp;
                  {movie.popularity} |&nbsp;
                  <AiFillStar /> &nbsp;
                  {parseFloat(movie.vote_average).toFixed(1)}
                </span>
              </div>
            </div>
            <div className="right-container">
              <h1 className='movie-main-info'>
                <span className="title">
                  {movie.title}
                </span>
                &nbsp;
                <span className="post-title">
                  <span className="year">
                    {extrairAno(movie.release_date)}
                  </span>
                  &nbsp;
                  <span>
                    Directed by
                  </span>
                  &nbsp;
                  <span className='director'>
                    {encontrarMembros(crew, 'Director').map(member =>
                      <span key={member.id}>{member.name}</span>
                    )}
                  </span>
                </span>
              </h1>
              <p className='tagline'>{movie.tagline}</p>
              <p>{movie.overview}</p>
              <div className="sub-title">
                <h2>CAST</h2>
                <div></div>
              </div>
              <div className="cast">
                {dezPrimeirosCast.map(actor => (
                  <Tooltip key={actor.id} title={actor.character} placement="top">
                    <span >{actor.name} </span>
                  </Tooltip>
                ))}
              </div>
              <div className="sub-title">
                <h2>CREW</h2>
                <div></div>
              </div>
              <div className="table-crew">
                <div className="table-row">
                  <td>Directed by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Director')?.map(member =>
                      <p key={member.id}  >{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Screenplay by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Screenplay')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Produced by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Producer')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Casting by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Casting')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Cinematography by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Director of Photography')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Edited by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Editor')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Music by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Original Music Composer')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <td>Production design by</td>
                  <div className='names'>
                    {encontrarMembros(crew, 'Production Design')?.map(member =>
                      <p key={member.id}>{member.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="sub-title">
                <h2>DETAILS</h2>
                <div></div>
              </div>

            </div>
          </Card>
          :
          <>
            <p>
              Carregando...
            </p>
          </>}
      </Container>
    </>
  )
}

export default Movie