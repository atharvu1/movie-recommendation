import './App.css';
import React, { useState } from "react";
import CardList from './CardList';
import TextField from '@material-ui/core/TextField';
import SearchIcon from './search.svg'

function App() {
  const [movieName, setMovieName] = useState("");
  const handleSubmit = async () => {
    if(movieName.length){
      console.log(movieName);
    }
      
    else{
      console.log("Empty fields not accepted")
    }
    // const res = await Axios.post("http://127.0.0.1:5000/get_sentiment", { text }, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // });
    
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
          size="medium" 
          onChange={ (e) => setMovieName(e.target.value) }
        />
        <img 
          id="search-icon"
          src={SearchIcon} 
          alt="Search Icon" 
          style={{ height: 53, width: 36 }}
          onClick = {handleSubmit}
        />
      </form>
      <CardList/>
    </div>
  );
}

export default App;
