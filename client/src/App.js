import './App.css';
import React, { useState } from "react";
import CardList from './CardList';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import SearchIcon from './search.svg'

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    if(movieName.length){
      console.log(movieName);
    }
      
    else{
      console.log("Empty fields not accepted")
    }
    const res = await Axios.post("http://127.0.0.1:5000/get_movie_list", { movieName }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    console.log(res.data)
    if(res.data.search_code === 200){
      setMovieList(res.data.movie_list);
      setErrorMessage("")
    }
    else{
      setErrorMessage(res.data.message)
      setMovieList({});
    }
    
  }
  return (
    <div className="App">
      <header className="App-header">
        Movie Recommendation System
      </header>
      <form noValidate autoComplete="off" id = "form">
        <TextField 
          id="outlined-basic" 
          label="Search of related movies" 
          variant="outlined"  
          onChange={ (e) => setMovieName(e.target.value) }
        />
        <img 
          id="search-icon"
          src={SearchIcon} 
          alt="Search Icon" 
          style={{ height: 57, width: 40 }}
          onClick = {handleSubmit}
        />
      </form>
      {
        errorMessage.length > 0 ? <div id = "error_message"> { errorMessage } </div> : <CardList movieList = {movieList} />
      }
      
    </div>
  );
}

export default App;
