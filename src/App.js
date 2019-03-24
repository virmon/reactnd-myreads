import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar';
import BookList from './BookList';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ 
          books 
        })
      })
  }
  getBooksByShelf = (shelf) => {
    return this.state.books.filter(r => r.shelf === shelf)
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar books={this.state.books} updateShelf={this.updateShelf} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList name={'Currently Reading'} books={this.getBooksByShelf('currentlyReading')} updateShelf={this.updateShelf} />
            <BookList name={'Wants to Read'} books={this.getBooksByShelf('wantToRead')} updateShelf={this.updateShelf} />
            <BookList name={'Read'} books={this.getBooksByShelf('read')} updateShelf={this.updateShelf} />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
