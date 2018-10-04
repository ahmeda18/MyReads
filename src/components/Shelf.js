import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  };
updateBook = (book, shelf) => {
  this.props.onChangeBookShelf(book, shelf);
};

render() {
  const books = this.props.books;

  return (
    <div className="list-books-content">
    <div className="list-books">
    <div className="bookshelf">
    <h2 className="bookshelf-title">{this.props.title}</h2>
    
<div className="bookshelf-books">
  <ol className="books-grid">
    {books.map(b => (
     <Book
     book={b}
key={b.id}
title={b.title}
author={b.authors}
image={b.imageLinks.smallThumbnail}
onShelfChange={shelf => {
               this.updateBook(b, shelf);
}}
/>
))}
  </ol>
</div>
</div>
</div>
</div>
);
}
}

export default Shelf;
