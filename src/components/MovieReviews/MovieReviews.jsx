import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieReviews } from '../../hooks/useMovie';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import Pagination from '../Pagination/Pagination';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  } = useMovieReviews(movieId);

  const reviews = movies.results;
  console.log('reviews:', reviews);

  const toggleReview = (id, e) => {
    const el = document.getElementById(`review-${id}`);
    if (!el) return;

    const isExpanded = el.classList.toggle(s.expanded);

    if (isExpanded) {
      el.classList.remove(s.limited);
      e.target.textContent = 'Less';
    } else {
      el.classList.add(s.limited);
      e.target.textContent = 'More';
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      
      {error && <Message type='error' message={error} />}
      {!loading && !error && (!reviews || reviews.length === 0) && (
        <Message type='info' message='There are no feedback on this movie.' />
      )}

      {reviews !== undefined && (
        <ul className={s.list}>
          {reviews.map((review) => {
            const formattedDate = new Date(
              review.created_at
            ).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const stripHTML = (htmlString) =>
              htmlString.replace(/<[^>]*>/g, '');

            return (
              <li className={s.item} key={review.id}>
                <div className={s.wrapperHeader}>
                  <p className={s.text}>{review.author}</p>
                  <p className={s.text}>{formattedDate}</p>
                </div>
                <p
                  className={`${s.review} ${s.limited}`}
                  id={`review-${review.id}`}
                >
                  {stripHTML(review.content)}
                </p>
                <div className={s.wrapperLink}>
                  <p className={s.toLink}>Review at: </p>
                  <a
                    className={s.link}
                    href={review.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {review.url}
                  </a>
                </div>
                <button
                  className={s.button}
                  onClick={(e) => toggleReview(review.id, e)}
                >
                  More
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};

export default MovieReviews;
