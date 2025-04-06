import axios from 'axios';

const getMovie = async (type, query, page = 1) => {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}`,
    },
  };

  let URL = '';

  if (type === 'trending') {
    URL = `https://api.themoviedb.org/3/trending/movie/day?language=en-EN&page=${page}`;
  }

  if (type === 'query' && query) {
    URL = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`;
  }

  if (type === 'id' && query) {
    URL = `https://api.themoviedb.org/3/movie/${query}?language=en-EN`;
  }
  if (type === 'cast' && query) {
    URL = `https://api.themoviedb.org/3/movie/${query}/credits?language=en-US`;
  }

  if (type === 'reviews' && query) {
    URL = `https://api.themoviedb.org/3/movie/${query}/reviews?language=en-US&page=${page}`;
  }

  try {
    const response = await axios.get(URL, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};

export default getMovie;
