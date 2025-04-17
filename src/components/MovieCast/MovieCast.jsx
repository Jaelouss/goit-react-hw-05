import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieCast } from '../../hooks/useMovie';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import photo from '../../images/simple-actor-placeholder.svg';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();

  const { movies, loading, error } = useMovieCast(movieId);

  const cast = movies.cast;

  return (
    <div>
      <h2>Cast</h2>
      
      {error && <Message type='error' message={error} />}
      {!loading && !error && (!cast || cast.length === 0) && (
        <Message type='info' message='There is no information about actors.' />
      )}
      {cast !== undefined && (
        <ul className={s.list}>
          {cast.map((actor) => {
            const actorPhoto = actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : photo;

            return (
              <li className={s.item} key={actor.cast_id || actor.credit_id}>
                <img
                  className={s.photo}
                  width='100'
                  src={actorPhoto}
                  alt={actor.original_name}
                />
                <p className={s.text}>{actor.original_name}</p>
                <span className={s.span}>as</span>
                <p className={s.text}>{actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
