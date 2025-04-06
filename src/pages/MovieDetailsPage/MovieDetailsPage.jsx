import React, { useRef } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useMovieId } from '../../hooks/useMovie';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import poster from '../../images/movie-poster-placeholder.svg';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { movies, loading, error } = useMovieId(movieId);
  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  const {
    poster_path,
    original_title,
    title,
    genres = [],
    homepage,
    origin_country,
    overview,
    production_companies,
    release_date,
    runtime,
    tagline,
  } = movies;
  console.log('movies:', movies);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : poster;

  if (loading) return <Loader />;
  if (error) return <Message type='error' message={error} />;
  if (!movies) return <Message type='warning' message='No movie data found.' />;

  return (
    <section className={s.section}>
      {movies && (
        <div className={s.container}>
          <Link className={s.back} to={backLink.current}>
            Go Back
          </Link>
          <h2 className={s.title}>{title}</h2>
          {homepage && (
            <p className={s.text}>
              <strong>Official site:</strong>{' '}
              <a
                className={s.homepage}
                href={homepage}
                target='_blank'
                rel='noopener noreferrer'
              >
                {homepage}
              </a>
            </p>
          )}
          <img
            className={s.image}
            width={250}
            src={imageUrl}
            alt={original_title}
          />
          <p className={s.text}>
            <strong>Genres:</strong>{' '}
            {genres.map((genre) => (
              <span key={genre.id} className={s.textSpan}>
                {genre.name}
              </span>
            ))}
          </p>
          {origin_country && (
            <p className={s.text}>
              <strong>Country:</strong>{' '}
              {origin_country.map((country, index) => (
                <span key={index} className={s.textSpan}>
                  {country}
                </span>
              ))}
            </p>
          )}
          {production_companies && (
            <p className={s.text}>
              <strong>Product by:</strong>
              {production_companies.map((company) => (
                <span key={company.id} className={s.textSpan}>
                  {company.name}
                </span>
              ))}
            </p>
          )}
          {release_date && (
            <p className={s.text}>
              <strong>Date of release:</strong> {release_date}
            </p>
          )}
          {runtime > 0 && (
            <p className={s.text}>
              <strong>Duration:</strong> {runtime} min.
            </p>
          )}
          {tagline && (
            <p className={s.text}>
              <em>{tagline}</em>
            </p>
          )}
          {overview && <p className={s.text}>{overview}</p>}
        </div>
      )}

      {movies && (
        <div className={s.wrapper}>
          <NavLink
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.active : ''}`
            }
            to='cast'
          >
            Cast
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.active : ''}`
            }
            to='reviews'
          >
            Reviews
          </NavLink>
        </div>
      )}
      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
