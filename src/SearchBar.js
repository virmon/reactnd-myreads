import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    state = {
      query: '',
      searchResult: []
    }
    search = (query) => {
      BooksAPI
        .search(query, 20)
        .then((result) => {
              this.compareToShelf(result, this.props.books);
      })
      .catch((error) => {
        this.setState({ searchResult: [] }) 
      });
    }
    compareToShelf = (results, books) => {
      //change from object to string
      var result = results.map(result => result.id);
      var book = books.map(book => book.id);
      //filter array
      var withShelf = result.filter(item => 
                   book.includes(item)
                 );
      var noShelf = result.filter(item => 
                   !book.includes(item)
                 );
      //get each index of filtered items
      var index = withShelf.map(item => 
                  book.indexOf(item)
                 );
      var index2 = noShelf.map(item => 
                  result.indexOf(item)
                 );
      //combine books and filtered
      var arr5 = index.map(item => books[item]);
      var arr6 = index2.map(item => results[item]);
      this.setState({ searchResult: arr5.concat(arr6) });
    }
    handleChange = (query) => {
      this.setState({ 
        query
      });
      this.state.query.length === '' ? this.setState({ searchResult: [] }) : this.search(query);
    }
    render() {
      //const { books } = this.props;
      const { query, searchResult } = this.state;
/*
      const filteredResult = query === ''
        ? result
        : result.filter((b) => (
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.authors[0].toLowerCase().includes(query.toLowerCase())
      ));
*/
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

export default SearchBar;