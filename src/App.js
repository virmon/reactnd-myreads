import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchBar from './SearchBar';
import BookList from './BookList';
import { Route, Link } from 'react-router-dom';
import './App.css';

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
  /** Returns books with shelf property equal to the passed argument */
  getBooksByShelf = (shelf) => {
    return this.state.books.filter(r => r.shelf === shelf)
  }
  /** Calls update API */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.checkExisting(book, this.state.books);
    });
  }
  checkExisting = (book, bookshelf) => {
    var booksById = bookshelf.map(item => item.id);
    var b = booksById.filter(item => !book.id.includes(item));
    var c = b.map(item => booksById.indexOf(item));
    var d = c.map(item => bookshelf[item]);
    this.setState(() => ({ books: d }));
    this.setState(prevState => ({ books: [...prevState.books, book] }));
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBar books={this.state.books} updateShelf={this.updateShelf} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList name={'Currently Reading'} books={this.getBooksByShelf('currentlyReading')} updateShelf={this.updateShelf} />
            <BookList name={'Want to Read'} books={this.getBooksByShelf('wantToRead')} updateShelf={this.updateShelf} />
            <BookList name={'Read'} books={this.getBooksByShelf('read')} updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;
