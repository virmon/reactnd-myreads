import React, { Component } from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class BookList extends Component {
  onUpdateShelf = (book) => {
    this.props.updateShelf(book, book.shelf);
    //console.log(book.id + ' ' + book.shelf);
  }
  render() {
    const { books, name } = this.props;
    return(
      <div className="list-books-content">
        <div className="bookshelf">
          {name === '' ? <h2>{name}</h2> : <h2 className="bookshelf-title">{name}</h2>}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                //console.log(books)
                books.length === 0
                ? <div>No results found</div>
                : books.map((book) => {
                    return(
                      <BookItem 
                        key={book.id} 
                        id={book.id} 
                        title={book.title} 
                        author={book.authors === undefined ? '' : book.authors[0]} 
                        image={book.imageLinks === undefined ? book.title : book.imageLinks.thumbnail} 
                        shelf={book.shelf === undefined ? 'none' : book.shelf} 
                        onUpdateShelf={this.onUpdateShelf} />
                    )
                })
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookList;