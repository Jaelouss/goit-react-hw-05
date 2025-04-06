import React, { useEffect, useState } from 'react';
import { useMovieQuery } from '../../hooks/useMovie';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('query') || '';
  const initialPage = parseInt(searchParams.get('page'), 10) || 1;

  const [value, setValue] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [pageNow, setPageNow] = useState(initialPage);

  const {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  } = useMovieQuery(submittedQuery, pageNow);

  const updateSearchParams = (query, page) => {
    const updatedParams = new URLSearchParams();

    if (query) {
      updatedParams.set('query', query);
    }

    if (page && page !== 1) {
      updatedParams.set('page', page.toString());
    }

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    if (submittedQuery) {
      updateSearchParams(submittedQuery, pageNow);
    }
  }, [submittedQuery, pageNow]);

  useEffect(() => {
    if (currentPage && currentPage !== pageNow) {
      setPageNow(currentPage);
    }
  }, [currentPage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.query.value.trim();

    if (!query) {
      setSubmittedQuery('');
      setPageNow(1);

      setSearchParams(new URLSearchParams());

      return;
    }

    setSubmittedQuery(query);
    setPageNow(1);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className={s.section}>
      <form onSubmit={handleSubmit}>
        <input
          name='query'
          type='text'
          placeholder='Search movies by title'
          value={value}
          onChange={handleChange}
        />
        <button type='submit'>Search</button>
      </form>

      {!value.trim() && !submittedQuery && (
        <Message
          type='info'
          message='Enter the search query to search for movies'
        />
      )}

      {loading && <Loader />}
      {error && <Message type='error' message={error} />}

      {movies.length < 1 && !loading && submittedQuery && (
        <Message
          type='warning'
          message='Nothing found, try clarifying the request'
        />
      )}

      {movies.length > 0 && submittedQuery && (
        <MovieList location={location} movies={movies} />
      )}

      {movies.length > 0 && submittedQuery && (
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

export default MoviesPage;
