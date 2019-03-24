import React from 'react';
import PropTypes from 'prop-types';

const BookItem = (props) => {
  /** Creates a book Object that contains id and shelf 
   *  that is passed as a parameter in onUpdateShelf 
   */
  function handleChange(value) {
    let book = {
      id: props.id,
      title: props.title,
      authors: [props.author],
      imageLinks: {thumbnail: props.image},
      shelf: value
    };
    props.onUpdateShelf(book);
  }
  return(
    <li>
      <div className="book">
        <div className="book-top">
           <img className='book-cover' key={props.image} src={props.image} alt={props.image} width={140} height={200} />
           <div className="book-shelf-changer">
              <select defaultValue={props.shelf} onChange={(e) => {handleChange(e.target.value)}} >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
           </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.author}</div>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  shelf: PropTypes.string,
  onUpdateShelf: PropTypes.func.isRequired
}

export default BookItem;