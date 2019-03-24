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
  /** 
   * @description Returns books with shelf property equal to the passed argument 
   * @param {string} shelf - The category of the shelf ('currentlyReading', 'wantsToRead', 'read')
   * returns {Object} Filtered Objects equal to passed parameter shelf
   */
  getBooksByShelf = (shelf) => {
    return this.state.books.filter(r => r.shelf === shelf)
  }
  /** 
   * @description Calls update API 
   * @param {Object} book - An Object containing id, title, author, imageLinks, and shelf
   * @param {shelf} shelf - The category of the shelf ('currentlyReading', 'wantsToRead', 'read')
   */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.checkExisting(book, this.state.books);
    });
  }
  /**
   * @description Set state of books to updated list
   * @param {array} book - An Object containing id, title, author, imageLinks, and shelf
   * @param {array} bookshelf - The current state of books in shelf
   */
  checkExisting = (book, bookshelf) => {
    var booksById = bookshelf.map(item => item.id);
    var filteredBooks = booksById.filter(item => !book.id.includes(item));
    var arrIndex = filteredBooks.map(item => booksById.indexOf(item));
    var currentBooks = arrIndex.map(item => bookshelf[item]);
    this.setState(() => ({ books: currentBooks }));
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
