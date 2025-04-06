import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h1 className={s.code}>404</h1>
        <p className={s.title}>Oh! The page was not found.</p>
        <p className={s.text}>It may have been moved or never existed.</p>
        <Link to='/' className={s.button}>
          Go to the main page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
