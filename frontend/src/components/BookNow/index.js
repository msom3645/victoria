import React from 'react';
import {Link} from 'react-router-dom'
import './book.css'
const BookNow = () => {
  return <Link to='/booknow' className='book-main-btn f fcenter'>
      BOOK NOW
  </Link>;
};

export default BookNow;
