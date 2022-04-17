import React from 'react';
import ReactDOM from 'react-dom/client';
import BookComponent from './bookComponent.jsx'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearchQuery: '',
      searchResponse: [],
      isbn: "039548930X",
      isLoading: false,
      isbnResponse: [],

      hardCodeIsbnResp: [{
        "url": "http://openlibrary.org/books/OL26872110M/Harry_Potter_and_the_Philosopher's_Stone",
        "key": "/books/OL26872110M",
        "title": "Harry Potter and the Philosopher's Stone",
        "authors": [{"url": "http://openlibrary.org/authors/OL23919A/J._K._Rowling", "name": "J. K. Rowling"}],
        "number_of_pages": 368,
        "identifiers": {},
        "classifications": {"lc_classifications": [""]},
        "publishers": [{"name": "Educa Books"}],
        "publish_date": "Aug 16, 2018",
        "subjects": [],
        "subject_places": [],
        "subject_people": [],
        "excerpts": [{"text": "Mr. And Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.", "comment": "first sentence"}],
        "links": [],
        "cover": {
          "small": "https://covers.openlibrary.org/b/id/8567557-S.jpg",
          "medium": "https://covers.openlibrary.org/b/id/8567557-M.jpg",
          "large": "https://covers.openlibrary.org/b/id/8567557-L.jpg"
        }
      },
      {
        "url": "http://openlibrary.org/books/OL26872110M/Harry_Potter_and_the_Philosopher's_Stone",
        "key": "/books/OL26872110M",
        "title": "Larry Potter and the Philosopher's Stone",
        "authors": [{"url": "http://openlibrary.org/authors/OL23919A/J._K._Rowling", "name": "J. K. Rowling"}],
        "number_of_pages": 368,
        "identifiers": {},
        "classifications": {"lc_classifications": [""]},
        "publishers": [{"name": "Educa Books"}],
        "publish_date": "Aug 15, 2018",
        "subjects": [],
        "subject_places": [],
        "subject_people": [],
        "excerpts": [{"text": "Mr. And Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.", "comment": "first sentence"}],
        "links": [],
        "cover": {
          "small": "https://covers.openlibrary.org/b/id/8567557-S.jpg",
          "medium": "https://covers.openlibrary.org/b/id/8567557-M.jpg",
          "large": "https://covers.openlibrary.org/b/id/8567557-L.jpg"
        }
      },
      {
        "url": "http://openlibrary.org/books/OL26872110M/Harry_Potter_and_the_Philosopher's_Stone",
        "key": "/books/OL26872110M",
        "title": "Jarry Potter and the Philosopher's Stone",
        "authors": [{"url": "http://openlibrary.org/authors/OL23919A/J._K._Rowling", "name": "J. K. Rowling"}],
        "number_of_pages": 368,
        "identifiers": {},
        "classifications": {"lc_classifications": [""]},
        "publishers": [{"name": "Educa Books"}],
        "publish_date": "Aug 15, 2007",
        "subjects": [],
        "subject_places": [],
        "subject_people": [],
        "excerpts": [{"text": "Mr. And Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.", "comment": "first sentence"}],
        "links": [],
        "cover": {
          "small": "https://covers.openlibrary.org/b/id/8567557-S.jpg",
          "medium": "https://covers.openlibrary.org/b/id/8567557-M.jpg",
          "large": "https://covers.openlibrary.org/b/id/8567557-L.jpg"
        }
      },]
    }
  }

  updateSearchQuery = (event) => {
    let searchInput = event.target.value
    let searchQuery = searchInput.replace(/\s/g, "+")

    this.setState({bookSearchQuery: searchQuery})
  }

  sendSearchQuery = (event) => {
    event.preventDefault()
    this.setState({searchResponse: []})

    fetch(`http://openlibrary.org/search.json?q=${this.state.bookSearchQuery}`)
    .then(response => response.json())
    .then(response => this.setState({searchResponse: response.docs}))
    .catch(error => console.log(error))

    fetch(`http://openlibrary.org/api/volumes/brief/isbn/1408883783.json`, {
    method: "GET",

    })
    .then(response => response)
    .then(response => this.setState({isbnResponse: response}))
    .catch(error => console.log(error))
  }
  
  checkBookObj = () => {
    console.log(this.state.searchResponse)
    console.log(this.state.isbnResponse)
  }

  sortByTitle = () => {
    const alphaSorted = this.state.hardCodeIsbnResp.sort((a, b) => a.title.localeCompare(b.title))
    this.setState({hardCodeIsbnResp: alphaSorted})
  }

  sortByPublishDate = () => {
    const datesSorted = this.state.hardCodeIsbnResp.sort((a, b) => {
      let aDate = new Date(a.publish_date)
      let bDate = new Date(b.publish_date)
      return aDate - bDate
    })

    this.setState({hardCodeIsbnResp: datesSorted})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.sendSearchQuery}>
            <input type="text" onChange={this.updateSearchQuery}/>
            <button>Submit</button>
          </form>
          <h4 onClick={this.checkBookObj}>check</h4>
          <h4 onClick={this.sortByTitle}>Sort Alphabetically</h4>
          <h4 onClick={this.sortByPublishDate}>Sort Dates</h4>
          {/*<div>{this.state.isLoading ? "loading..." : "not loading yet"}</div>*/}
          {this.state.hardCodeIsbnResp.length > 0 ? this.state.hardCodeIsbnResp.map((book, i) => 
            <BookComponent book={book} key={i}/>
          ) : ""}
        </header>
      </div>
    );
  }
}

export default App;
