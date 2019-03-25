# MyReads Project

MyReads Project is a **book tracking app** that lets users categorize their own bookshelf. Users may search on books and categorize them by _currently reading_, _want to read_, and _read_. This project is one of the requirements in React Nanodegree Program.

## Getting Started
* Download or `git clone https://github.com/virmon/reactnd-myreads.git`
* Install all project dependencies with `npm install`
* Start the development server with `npm start`
* Open `http://localhost:3000/` in your browser

## Table of Contents
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BookItem.js #  This component renders a book item .
    ├── BookList.js #  This component renders a list of book item.
    ├── SearchBar.js # This component renders a search box and a list of books from the search results.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering.
```

## Screenshots

- **Home Screen**
![home screen](/screenshots/home.png "Home Screen")

- **Search Screen**
![search screen](/screenshots/search.png "Search Screen")

- **With search results**
![search results](/screenshots/search_result.png "Search Screen with results")

## Backend Server

[`BooksAPI.js`](src/BooksAPI.js), the backend server used in MyReads Project. This API was provided by Udacity in order to perform necessary operations on the backend.

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
