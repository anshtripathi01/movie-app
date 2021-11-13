import React from 'react';
import search from './search.png';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const year = new Date();
  const [movies, setMovie] = useState([]);
  const [query, setQuery] = useState("a")
  const [loading, setLoading] = useState(true);
      const API_KEY=process.env.REACT_APP_MY_API;
      const url=`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;

      function onQuery(e){
        if (e.target.value===""){

          setQuery(query);
        }
        else{
          setQuery(e.target.value);
        }
        
        
        }
        
 useEffect(() => {
  return movieDB(query);
},[]);//eslint-disable-line
      function movieDB(){

        setLoading(true);
        fetch(url)
        
        .then((res) => {
         return res.json();
        })
        .then(res => {
          
          setMovie(res.results);
          setLoading(false);
        })
        .catch(error => {
          console.log(`Error,${error}`);
          setLoading(false);
        });
      }
     

  return (
    <div className="App">
      <header className="App-header">
      <span>Masti-Movie</span>
     <div className="form">
     <form >
     <input onChange={onQuery} placeholder="Search a movie" required />

       <img className="search" src={search}  onClick={movieDB} alt="search-bar" value="submit"  />
     
     </form>
       
       {loading && <h1>Searching......</h1> }
       </div>
        <div className="Wrapper" >{movies.map(movie=>{
         
          return(
            
            <div key={movie.id} className="row" >
            
           
            <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path}  alt="poster_path" />
            <small>{movie.vote_average}</small>
            <h5 >{movie.title}</h5>
            <p>{movie.release_date}</p>

            </div>
           )
        })}
        </div>
       <p>&copy;{year.getFullYear()} Made with 💕 By Ansh</p>
      </header>
    </div>
  );
}

export default App;
