import { Link } from 'react-router-dom';
import s from './Message.module.css';

const Message = ({ type = 'info', message }) => {
  return (
    <div className={`${s.message} ${s[type]}`}>
      <p>
        {type === 'error' && '❌ '}
        {type === 'warning' && '⚠️ '}
        {type === 'info' && 'ℹ️ '}
        {message}
      </p>
      {type !== 'info' && <p>Please try again</p>}
      {type !== 'info' && (
        <Link to='/' className={s.retryButton}>
          Go to the main page
        </Link>
      )}
    </div>
  );
};

export default Message;
