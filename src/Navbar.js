import React from 'react';
import Home from './components/Home';
import MovieList from './components/MoviesList/MoviesList';
import logo from './asset/movielogo.png';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
        {/* <label className="logo">Movies</label> */}
        <img src={logo} alt="" />
        <ul>
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/movie-list">Movie List</a></li>
            <li><a href="/add-movie">Add Movie</a></li>
        </ul>
        <label id="icon">
            <i className="fas fa-bars"></i>
        </label>  
        <section></section>     
    </nav>
    
  )
}

export default Navbar;