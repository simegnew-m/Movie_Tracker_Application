import { useState, useEffect, Fragment  } from 'react';
import { db } from '../firebase-config.js';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import './Home.css';
import { async } from '@firebase/util';

function Home(){
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newRating, setNewRating] = useState("");
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  // const fetchData = async (id, title, genre, date, rating) => {
  //   const data = await getDocs(moviesCollectionRef);
  // }

  


  useEffect(() => {
    const getMovies = async () => {
      const data = await getDocs(moviesCollectionRef);
        // console.log(data);
      setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getMovies();
  }, [])
  return (
    <div className="dashboard">
      {/* Favourite Genre*/}
      <div className="favourite">
        <div className="getfavourite">
          <h2>Favourite Genre</h2>
          {movies.filter(movie => movie.rating >= 4 && movie.genre).map((movie) => {
            // if(movie.rating >= 4 ){
            //   return (
            //     movie.genre
            //   );
            // }else{

            // }; 
            return movie.genre;
          })}
        </div>
      </div>
      {/* Average movies watched per month */}
      <div className="average"><h2>Average Movies Watched Per Month</h2></div>
      {/* Current Mood */}
      <div className="mood">
        <h2>Current Mood</h2>
        {movies.map((movie) => {
          if(movie.rating >= 4){
            return <div className="emojis">😊</div>;
          }else if(movie.rating >=2 && movie.rating <= 3){
            return <div className="emojis">😐</div>;
          }else{
            return <div className="emojis">😔</div>;
          };
          
        })}
      </div>
    </div>
  )
}

export default Home;