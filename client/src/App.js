import React from 'react';
import BookComponent from './bookComponent.jsx'

import './App.css';

const isbnsToQuery = 3;

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bookSearchQuery: '',
      isbnResponse: [],
    }
  }

  updateSearchQuery = (event) => {
    let searchInput = event.target.value
    let searchQuery = searchInput.replace(/\s/g, "+")

    this.setState({bookSearchQuery: searchQuery})
  }

  sendSearchQuery = (event) => {
    event.preventDefault()
    this.setState({isbnResponse: []})

    let isbnArray = []

    fetch(`https://openlibrary.org/search.json?q=${this.state.bookSearchQuery}`)
    .then(response => response.json())
    .then(response => {
      console.log(response.docs)
      isbnArray = this.getIsbnNumbers(response.docs)
    })
    .then(response => {
      isbnArray.forEach((isbn) => {
        fetch(`http://localhost:3001?isbn=${isbn.isbn}`)
        .then(response => response.json())
        .then(response => {
          this.setState({isbnResponse: [...this.state.isbnResponse, response.records[isbn.seed].data]})
        })
        .catch(error => console.log(error))
      })
    })
    .catch(error => console.log(error))
  }

  getIsbnNumbers = (bookArray) => {
    // console.log(bookArray)
    const isbnArray = []

    bookArray.forEach((book) => {
      if (book.isbn) {
        let bookId = book.seed.slice(0, 1)
        let bookIsbns = book.isbn.slice(0, isbnsToQuery)
        bookIsbns.forEach(isbn => {
          bookId.forEach(seedId => {
            isbnArray.push({isbn: isbn, seed: seedId})
          })
        })
      }
    })

    let maximumArray = isbnArray.slice(0, 49)
    return maximumArray
  }


  
  checkBookObj = () => {
    console.log(this.state.searchResponse)
    console.log(this.state.isbnResponse)
  }

  sortByTitle = () => {
    const alphaSorted = this.state.isbnResponse.sort((a, b) => a.title.localeCompare(b.title))
    this.setState({isbnResponse: alphaSorted})
  }

  sortByPublishDate = () => {
    const datesSorted = this.state.isbnResponse.sort((a, b) => {
      let aDate = new Date(a.publish_date)
      let bDate = new Date(b.publish_date)
      return bDate - aDate
    })

    this.setState({isbnResponse: datesSorted})
  }

  render() {
    return (
      <div className="App">
        <header className="book_search-header">
          <h1>Book Search Tool</h1>
          <form className="book_search-form_fields" onSubmit={this.sendSearchQuery}>
            <input className="book_search-input" placeholder="Search by Book Title/Author" type="text" onChange={this.updateSearchQuery}/>
            <button className="book_search-submit">Submit</button>
          </form>
          <div className="book_search-sorting">
            <h4 onClick={this.sortByTitle}>Sort by A-Z</h4>
            <h4 onClick={this.sortByPublishDate}>Sort by Date</h4>
          </div>
        </header>

        <div className="book_search-response">
          {this.state.isbnResponse.length > 0 ? this.state.isbnResponse.map((book, i) => 
            <BookComponent book={book} key={i}/>
          ) : ""}
          </div>
      </div>
    );
  }
}

export default App;
