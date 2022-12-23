import { useState, useEffect, Fragment } from "react";
import { db } from "../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Home.css";
import { async } from "@firebase/util";
import { Button, Spin } from "antd";
import { motion } from 'framer-motion';
import { Carousel } from 'antd';

function Home() {
 
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const [maxindex, setMaxindex] = useState(0);

  const [avgHorror, setAvgHorror] = useState([]);
  const [avgComedy, setAvgComedy] = useState([]);
  const [avgAction, setAvgAction] = useState([]);
  const [avgAdventure, setAvgAdventure] = useState([]);

  const [favgenre, setFavgenre] = useState("");

  const [maxval, setMaxval] = useState(0);
  const [finish, setFinish] = useState(false);
  const [currentrating, setCurrentrating] = useState(null);
  const [currentval, setCurrentval] = useState("");
  const [currentIndex, setCurrentindex] = useState("");

  // const m1 = db.collection('movies').where('rating', '>', 4);

  const getMovies = async () => {
    const data = await getDocs(moviesCollectionRef);

    data.docs.map((doc) => {
      if (doc.data().genre === "Comedy") {
        avgComedy.push(doc.data().rating);
      } else if (doc.data().genre === "Horror") {
        // console.log("qqqqq", doc.data().title );
        avgHorror.push(doc.data().rating);
      } else if (doc.data().genre === "Action") {
        avgAction.push(doc.data().rating);
      } else if (doc.data().genre === "Adventure"){
        avgAdventure.push(doc.data().rating);
      } else {
        console.log("")
      }

      if (currentval <= doc.data().date) {
        setCurrentval(doc.data().date);
        setCurrentrating(doc.data().rating);
      }

    });

    let average = avgComedy.reduce((a, b) => a + b, 0) / avgComedy.length;
    let average1 = avgHorror.reduce((a, b) => a + b, 0) / avgHorror.length;
    let average2 = avgAction.reduce((a, b) => a + b, 0) / avgAction.length;
    let average3 =
      avgAdventure.reduce((a, b) => a + b, 0) / avgAdventure.length;

    const choosen = Math.max(average, average1, average2, average3);
    console.log(
      "choosen",
      choosen,
      average,
      average1,
      average2,
      average3,
      avgComedy
    );

    if (choosen == average) {
      setFavgenre("Comedy");
    } else if (choosen == average1) {
      setFavgenre("Horror");
    } else if (choosen == average2) {
      setFavgenre("Action");
    } else if (choosen == average3){
      setFavgenre("Adventure");
    } else {
      setFavgenre("No Favorite Genre")
    }
    console.log("first", favgenre);

    setAvgHorror([]);
    setAvgComedy([]);
    setAvgAction([]);
    setAvgAdventure([]);

    setFinish(true);
  };

  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
    color: "wheat", 
    display: "flex", 
    flexDirection: "column"
  };

  // );
  // const getAvg = async () => {
  //     movies.map((movie, index) => {
  //       // console.log("11aaaaa",new Date (movie.date))
  //       console.log(
  //         "first000",
  //         new Date(movie.date).getFullYear(),
  //         new Date(movie.date).getMonth()
  //       );

  //   if (currentval <= movie.date) {
  //     setCurrentval(movie.date);
  //     setCurrentindex(index);
  //     // console.log("date", movie.date > "2022-12-06")
  //     console.log("qqqq")
  //   }

  //   console.log("first000", currentIndex);
  //   });
  // };
  useEffect(() => {

  getMovies();
  // getAvg();
  }, []);

  if (!finish) {
    return (
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
    );
  }

  return (
    <div className="dashboard">
     
        <Carousel autoplay>
          <div>
            <div className="welcome" style={contentStyle}>
              <h1>Welcome to My Movies</h1>
            </div>
          </div>
          <div>
              <div className="favgenre" style={contentStyle}>
                  <h2>Favourite Genre</h2>
                  <p>{favgenre}</p> 
              </div>
          </div>
          <div>
            <div className="average" style={contentStyle}>
                <h2>Average Movies Watched Per Month</h2>
                <p>{currentIndex}</p>
            </div>
          </div>
          <div>
            <div className="mood" style={contentStyle}>
                <h2>Current Mood</h2>
                {currentrating >= 4 ? (
                  <div className="emojis"> 😊 </div>
                ) : currentrating >= 2 && currentrating <= 3 ? (
                  <div className="emojis"> 😐 </div>
                ) : (
                  <div className="emojis"> 😔 </div>
                )}
            </div>
          </div>
        </Carousel>
      </div>
  
  );
}

export default Home;
