import React, { useState } from 'react'
import "./Home.scss"
import axios from "axios"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "2c70623967af0da2316a1057390d1b30";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const nowPlaying = "now_playing"
const popular = "popular";
const topRated = "top_rated";
const imgUrl = "https://image.tmdb.org/t/p/original"


const Card = ({ img }) => (
  <img className='card' src={img} alt="imge" />
)

const Row = ({ title, arr = [{
  img: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg"
}] }) => (

  <div className='row'>
    <h2>{title}</h2>
    <div>

      {
        arr.map((item, index) => (
          < Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }

    </div>
  </div>

)


const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])




  useEffect(() => {

    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=2`);

      setUpcomingMovies(results)
    };
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);

      setNowPlayingMovies(results)
    };
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);

      setPopularMovies(results)
    };
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);

      setTopRatedMovies(results)
    };

    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);

      setGenre(genres)
    }
    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchTopRated();
    fetchPopular();

  }, [])


  return (
    <section className='home'>
      <div className="banner" style={
        {
          backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : " rgb(5, 5, 5);"
        }
      }>
        {
          popularMovies[0] && (
            <h1>{popularMovies[0].original_title}</h1>
          )
        }
        {
          popularMovies[0] && (
            <p>{popularMovies[0].overview}</p>
          )
        }
        <div>
          <button > <BiPlay /> Play     </button>
          <button>My List <AiOutlinePlus /> </button>
        </div>

      </div>
      <Row title={'Upcoming Movies'} arr={upcomingMovies} />
      <Row title={'nowPlaying Movies'} arr={nowPlayingMovies} />
      <Row title={'popular Movies'} arr={popularMovies} />
      <Row title={'Top Rated Movies'} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>

    </section>
  )
}

export default Home