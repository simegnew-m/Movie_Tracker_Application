import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import AddMovie from "../AddMovie/AddMovie";
import "./EditMovie.css";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";

function EditMovie() {
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newRating, setNewRating] = useState("");
  const [movies, setMovies] = useState();
  const moviesCollectionRef = collection(db, "movies");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const updateMovies = async () => {
    try {
      await updateDoc(doc(db, "movies", params.id), {
        rating: newRating,
        title: newTitle,
        genre: newGenre,
        date: newDate,
      });
      console.log("record updated");
      // update your state 
    } catch (error) {
      console.log(error.message);
    }

  };
  const getMovies = async () => {
    const data = await getDoc(doc(db, "movies", params.id));
    // console.log( params.id, data._document.data.value.mapValue.fields);
    setMovies(data._document.data.value.mapValue.fields);
    setNewTitle(data._document.data.value.mapValue.fields.title.stringValue);
    setNewGenre(data._document.data.value.mapValue.fields.genre.stringValue);
    setNewDate(data._document.data.value.mapValue.fields.date.stringValue);
    setNewRating(data._document.data.value.mapValue.fields.rating.stringValue);

    // console.log("first", movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const INPUT = {
    border: "1px solid #00000040",
    display: "flex",
    width: "80%",
    borderRadius: "3px",
  };


  return (
    <div className="rowedit" style={{ marginLeft: "25%" }}>
      <h1>Edit Movie</h1>
      {movies ? (
        <div style={{ width: "80%" }}>
          <form>
            <div className="app_flex text-center">
              <div>
                <input
                  style={INPUT}
                  type="text"
                  placeholder="Title"
                  value={newTitle}
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
                    border: "1px solid #00000040",
                    borderRadius: "5px",
                  }}
                  value={newGenre}
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
                  style={INPUT}
                  type="date"
                  placeholder="Watch Date"
                  required
                  value={newDate}
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
                    border: "1px solid #00000040",
                    borderRadius: "5px",
                  }}
                  value={newRating}
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
            </div>
          </form>
          <button
            className="btn-edit"
            style={{ fontSize: "20px" }}
            onClick={() => {
              updateMovies();
              navigate(`/movie-list`);
            }}
          >
            Update Movie
          </button>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
export default EditMovie;
