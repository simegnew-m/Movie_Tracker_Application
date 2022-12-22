import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { async } from '@firebase/util';
import { BrowserRouter as Router, Route, Routes, withRouter} from "react-router-dom";
import Header from './Header';
import Home from './components/Home';
import MovieList from './components/MoviesList/MoviesList';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
// import DeleteMovie from './components/DeleteMovie/DeleteMovie';
import Navbar from './Navbar';

function App() {
  // const [newTitle, setNewTitle] = useState("");
  // const [newGenre, setNewGenre] = useState("");
  // const [newDate, setNewDate] = useState("");
  // const [newRating, setNewRating] = useState("");
  // const [movies, setMovies] = useState([]);
  // const moviesCollectionRef = collection(db, "movies");

  // const addMovies = async () => {
  //   await addDoc(moviesCollectionRef, {title: newTitle, genre: newGenre, date: newDate, rating: newRating});
  // };

  // const updateMovies = async (id, title, genre, date, rating) => {
  //   const movieDoc = doc(db, "movies", id);
  //   const newFields = {rating: newRating, title: newTitle, genre: newGenre};
  //   await updateDoc(movieDoc, newFields);
  // }

  // const deleteMovie = async (id) => {
  //   const movieDoc = doc(db, "movies", id);
  //   await deleteDoc(movieDoc);
  // }

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const data = await getDocs(moviesCollectionRef);
  //     // console.log(data);
  //     setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }
  //   getMovies();
  // }, [])
  
  // return (
  //   <div className="App">
      // <input 
      //   placeholder="Title" 
      //   onChange={(event) => {
      //     setNewTitle(event.target.value);
      // }}/><br></br>
      // <input 
      //   placeholder="Genre"
      //   onChange={(event) => {
      //     setNewGenre(event.target.value);
      //   }}
      // /><br></br>
      // <input 
      //   type="date" 
      //   placeholder="Watch Date" 
      //   onChange={(event) => {
      //     setNewDate(event.target.value);
      //   }} 
      // /><br></br>
      // <input 
      //   type="number" 
      //   placeholder="Rating" 
      //   onChange={(event) => {
      //     setNewRating(event.target.value);
      //   }}
      // /><br></br>
      // <button onClick={addMovies}>Add Movie</button>
      // {movies.map((movie) => {
      //   return (
      //     <div>
      //       {" "}
      //       <h1>Title: {movie.title}</h1>
      //       <h1>Genre: {movie.genre}</h1>
      //       <h1>Date: {movie.date}</h1>
      //       <h1>Rating: {movie.rating}</h1>
      //       <button onClick={() => {
      //         updateMovies(movie.id, movie.title, movie.genre, movie.date, movie.rating);
      //       }}>Update Movies</button>
      //       <button 
      //         onClick={() => {
      //           deleteMovie(movie.id);
      //         }}>
      //           {" "}
      //           Delete Movies
      //       </button>
      //     </div>
      //   );
      // })}
  //   </div>
  // )
  return (
    <main className='container'>
      <Router>
        <Navbar />
        
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
          
        </Routes>
        </div>
      </Router>
       
    </main>
  );
}

export default App;
