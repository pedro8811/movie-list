import styled from "styled-components"
import { BiCameraMovie } from 'react-icons/bi'
import { Button, TextField } from "@mui/material"
import { BsSearch } from 'react-icons/bs'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Nav = styled.nav`
  position: absolute;
  width: 100%;
  background-color: #2c2c2c;
  box-shadow: 0 0 10px 1px #000000;
`

const Container = styled.div`
  height: 4rem;
  padding: 0 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a{
    text-decoration: none;
  }
`

const Logo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: #ed6c02;
  svg{
    font-size: 3rem;
    margin-right: .3rem;
  }
`

const SearchBar = styled.form`
  display: flex;
  input{
    height: 15px;
    min-width: 35rem;
    font-family: 'Inter';
    color: white;
  }
  button{
    color: white;
    margin-left: 2rem;
    background-color: #ed6c02;
  }
  button:hover{
    background-color: #ff7300;
  }
`

const Navbar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return
    
    navigate(`/search?q=${search}`)
    setSearch('')
  }

  return (
    <Nav>
      <Container>
        <Link to="/">
          <Logo>
            <BiCameraMovie />
            <h1>Movie List</h1>
          </Logo>
        </Link>
        <SearchBar onSubmit={handleSubmit}>
          <TextField
            color="warning"
            type="text"
            placeholder="Pesquisar filme..."
            variant="outlined"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <Button type="submit">
            <BsSearch style={{ fontSize: '1.5rem' }} />
          </Button>
        </SearchBar>
      </Container>
    </Nav>
  )
}

export default Navbar