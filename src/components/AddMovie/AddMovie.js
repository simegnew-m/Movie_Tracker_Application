import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import "./AddMovie.css";
import { Navigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Button, message } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  withRouter,
} from "react-router-dom";
import MoviesList from "../MoviesList/MoviesList";

function AddMovie() {
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newRating, setNewRating] = useState("");
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState([false]);
  const addMovies = async () => {
    await addDoc(moviesCollectionRef, {
      title: newTitle,
      genre: newGenre,
      date: newDate,
      rating: newRating,
    })
      .then((doc) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Something wrong");
      });

    <Link className="nav-link" to="/movie-list">
      Add Movie
    </Link>;
    // setRefresh(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newTitle.length == 0 ||
      newGenre.length == 0 ||
      newDate.length == 0 ||
      newRating.length == 0
    ) {
      setError(true);
    };
    if (newTitle && newGenre && newDate && newRating) {
      addMovies();
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await getDocs(moviesCollectionRef);
      setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMovies();
  }, [refresh]);
  const INPUT = {
    border: "1px solid #00000040",
    display: "flex",
    width: "80%",
    borderRadius: "3px",
  };

  return (
    <div className="rowadd" style={{ marginLeft: "25%" }}>
      <h1>Add Movies</h1>
      <form onSubmit={handleSubmit}>
        <div className="app_flex text-center">
          <div>
            <input
              style={INPUT}
              // className="inputs"
              type="text"
              placeholder="Title"
              required
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          </div>
          {error && newTitle.length <= 0 ? (
            <label>Title can't be Empty</label>
          ) : (
            ""
          )}
          <div>
            <select
              placeholder="genres"
              style={{
                height: "70px",
                textDecoration: "none",
                width: "85%",
                marginLeft: "7px",
                backgroundColor: "#f2f9fc",
                fontSize: "23px",
                paddingLeft: "15px",
                // color: "#949799",
                border: "1px solid #00000040",
                borderRadius: "5px",
              }}
              onChange={(event) => {
                setNewGenre(event.target.value);
              }}
            >
              <option>Select the Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Adventure">Adventure</option>
              <option value="Horror">Horror</option>
            </select>
            
          </div>
          {error && newGenre.length <= 0 ? (
            <label>Genre can't be Empty</label>
          ) : (
            ""
          )}
          <div>
            <input
              className="date"
              style={INPUT}
              type="date"
              placeholder="Watch Date"
              required
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            />
          </div>
          {error && newDate.length <= 0 ? (
            <label>Date can't be Empty</label>
          ) : (
            ""
          )}
          <div>
            <select
              placeholder="Rating"
              style={{
                height: "70px",
                textDecoration: "none",
                width: "85%",
                marginLeft: "7px",
                backgroundColor: "#f2f9fc",
                fontSize: "23px",
                paddingLeft: "15px",
                // color: "#949799",
                border: "1px solid #00000040",
                borderRadius: "5px",
              }}
              onChange={(event) => {
                setNewRating(event.target.value);
              }}
            >
              <option>Select your Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            
          </div>
          {error && newRating.length <= 0 ? (
            <label>Rating can't be Empty</label>
          ) : (
            ""
          )}
          <button
            className="btn-add"
            type="submit"
            onClick={handleSubmit}
          >
            Add Movie
          </button>
          
        </div>
      </form>
    </div>
  );
}
export default AddMovie;
