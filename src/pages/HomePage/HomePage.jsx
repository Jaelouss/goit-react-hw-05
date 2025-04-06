import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Pagination from '../../components/Pagination/Pagination';
import { useMovieTrending } from '../../hooks/useMovie';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import s from './HomePage.module.css';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  const {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  } = useMovieTrending();

  return (
    <section className={s.section}>
      <h1 className={s.title}>Trending Movies</h1>
      {loading && <Loader />}
      {error && <Message type='error' message={error} />}

      {movies.length > 0 && <MovieList location={location} movies={movies} />}

      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </section>
  );
};

export default HomePage;
