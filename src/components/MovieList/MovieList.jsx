import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';
import poster from '../../images/movie-poster-placeholder.svg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  useEffect(() => {
    if (movies.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [movies]);

  return (
    <ul className={s.list}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : poster;

        return (
          <li key={movie.id}>
            <NavLink
              state={location}
              className={s.link}
              to={`/movies/${movie.id}`}
            >
              <img width={200} src={imageUrl} alt={movie.original_title} />
              <span className={s.title}>{movie.title}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
