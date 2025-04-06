import { useState, useEffect } from 'react';
import getMovie from '../api/getMovie';

export const useMovies = (type, query = '', page = 1) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      if (
        (type === 'query' || type === 'cast' || type === 'reviews') &&
        query.trim() === ''
      )
        return;

      setLoading(true);
      const movieData = await getMovie(type, query, currentPage);

      if (movieData) {
        if (type === 'id' || type === 'cast' || type === 'reviews') {
          setMovies(movieData);
        } else {
          setMovies(movieData.results);
          setTotalPages(movieData.total_pages);
        }
      } else {
        setError('Error fetching movies');
      }
      setLoading(false);
    };

    const delay = setTimeout(() => {
      getMovies();
    }, 500);

    return () => {
      clearTimeout(delay);
    };
  }, [type, query, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  };
};

export const useMovieTrending = (page) => useMovies('trending', page);

export const useMovieQuery = (query, page) => useMovies('query', query, page);

export const useMovieId = (id) => useMovies('id', id);

export const useMovieCast = (id, page) => useMovies('cast', id, page);

export const useMovieReviews = (id, page) => useMovies('reviews', id, page);
