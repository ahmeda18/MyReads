import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BookContent from "./components/BookContent";
import SearchPage from "./components/SearchPage";

class BooksApp extends React.Component {
  state = {
    books: []
  };

componentDidMount() {
  this.handleBooksRetreival();
}

handleBooksRetreival = () => {
  BooksAPI.getAll().then(books => {
    this.setState(() => ({
      books
    }));
  });
};
handleShelfChange = (book, shelf) => {
  BooksAPI.update(book, shelf).then(() => {
    this.handleBooksRetreival();
  });
};

render() {
  return (
    <div className="app">
        <Route exactpath="/"
        render={() => (
        <div>
          <BookContent
          books={this.state.books} onChange={this.handleShelfChange}/>
          <Link to="/search"><button className="add-button" /></Link>
</div>
)}
/>
<Route
path="/search"
render={history => (
        <div>
        <SearchPage
        allBooks={this.state.books}
          onChange={this.handleShelfChange}
/>
  </div>
)}
/>
</div>
);
}
}

export default BooksApp;
