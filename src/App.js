import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { async } from '@firebase/util';
import { BrowserRouter as Router, Route, Routes, withRouter} from "react-router-dom";
import Home from './components/Home';
import MovieList from './components/MoviesList/MoviesList';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
// import DeleteMovie from './components/DeleteMovie/DeleteMovie';
import Navbar from './Navbar';

function App() {
  
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
