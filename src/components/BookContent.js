import React, { Component } from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";

class BookContent extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

render() {
  const books = this.props.books;

  return (
    <div className="list-books">
    <div className="jumbotron">
    <h1 className="jumbotron-text">My Library</h1>
    </div>
    <Shelf
    title="Currently Reading"
    books={books.filter(book => book.shelf === "currentlyReading")}
onChangeBookShelf={this.props.onChange}
/>
  <Shelf
title="Want to Read"
books={books.filter(book => book.shelf === "wantToRead")}
onChangeBookShelf={this.props.onChange}
/>
  <Shelf
title="Read"
books={books.filter(book => book.shelf === "read")}
onChangeBookShelf={this.props.onChange}
/>
  </div>
);
}
}

export default BookContent;
