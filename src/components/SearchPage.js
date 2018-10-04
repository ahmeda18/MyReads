import React from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class SearchPage extends React.Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

state = {
  books: [],
  query: ""
};

updateQuery = query => {
  this.setState(() => ({
    query: query.trim()
  }));
  console.log(query);
  this.handleSearch(query);
};

searchSelfChange = books => {
  const allBooks = this.props.allBooks;
  for (let book of books) {
    book.shelf = "none";
  }

  for (let book of books) {
    for (let bok of allBooks) {
      if (book.title === bok.title) {
        book.shelf = bok.shelf;
      }
    }
  }
  return books;
};

filterBooks = books => {
  return books.filter(book => book.imageLinks).filter(book => book.authors);
};

bookRefresh = (bok, shelf) => {
  this.props.onChange(bok, shelf);
  switch (shelf) {
    case "wantToRead":
      alert("Added - Want to Read Section");
      break;
    case "CurrentlyReading":
      alert("Added - Currently Reading Section");
      break;
    default:
      alert("Added - Read Section");
  }
};

handleSearch = query => {
  if (query.length > 0) {
    BooksAPI.search(query).then(books => {
      if (books.length > 0) {
        books = this.filterBooks(books);
        books = this.searchSelfChange(books);
        console.log(books);
        this.setState(() => {
          return { books: books };
        });
      } else {
        this.setState({ books: [], query: "" });
      }
    });
  }
};

render() {
  return (
    <div className="search-books">
    <div className="search-books-bar">
    <Link to="/" className="close-search">
    close
    </Link>
    <div className="search-books-input-wrapper">
    <input
    type="text"
    placeholder="Search by title or author"
    onChange={event => this.updateQuery(event.target.value)}
/>
</div>
</div>

{this.state.books.length > 0 && (
  <div>
  <p className="now-showing">
  {" "}
Now showing {this.state.books.length} book results.{" "}
</p>
<div className="search-books-results">
  <ol className="books-grid">
    {this.state.query.length !== 0 &&
     this.state.books.map(b => (
     <Book
     book={b}
key={b.id}
title={b.title}
author={b.authors}
image={b.imageLinks.smallThumbnail}
onShelfChange={shelf => {
               this.bookRefresh(b, shelf);
}}
/>
))}
  </ol>
</div>
</div>
)}
  </div>
);
}
}

export default SearchPage;
