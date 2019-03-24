import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    state = {
      query: '',
      searchResult: []
    }

    /** 
     * @description Calls the search API 
     * @param {string} query - Value from search box 
     */
    search = (query) => {
      BooksAPI
        .search(query, 20)
        .then((result) => {
              this.findBooksWithShelf(result, this.props.books);
      })
      .catch((error) => {
        this.setState({ searchResult: [] }) 
      });
    }

    /** 
     *  @description Compares the result from search API and props books. 
     *  Array results and books are mapped into strings then filters result.
     *  Array with shelf property and the other with non-shelf property
     *  then get indeces of each Object in the array. Indeces are mapped
     *  to return the Object then change the state of searchResult to the concatenated arrays
     * @params {array} results - Books returned from search API
     * @params {array} books - Books existing in shelf
    */
    findBooksWithShelf = (results, books) => {
      // Make each Object to string then declare to a variable
      var result = results.map(result => result.id);
      var book = books.map(book => book.id);
      
      // Filter both array with shelf and no shelf
      var withShelf = result.filter(item => book.includes(item));
      var noShelf = result.filter(item => !book.includes(item));
      
      // Map each array of filtered items
      var index = withShelf.map(item => book.indexOf(item));
      var index2 = noShelf.map(item => result.indexOf(item));
      
      // Map each index with its corresponding Object
      var arrBooks = index.map(item => books[item]);
      var arrResults = index2.map(item => results[item]);
      
      // Concatenate both arrays then set the state
      this.setState({ searchResult: arrBooks.concat(arrResults) });
    }

    /** 
     * @description Handles input field when something has changed 
     * @param {string} query - Change state on every update on seach box
     */
    handleChange = (query) => {
      this.setState({ 
        query
      });
      this.state.query.length === '' ? this.setState({ searchResult: [] }) : this.search(query);
    }
    render() {
      const { query, searchResult } = this.state;
      return(
          <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input 
                    type="text" 
                    placeholder="Search by title or author" 
                    value={query} 
                    onChange={(e) => this.handleChange(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <BookList 
                    books={searchResult} 
                    updateShelf={this.props.updateShelf} />
                </ol>
              </div>
          </div>
        )
    }
}

SearchBar.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default SearchBar;