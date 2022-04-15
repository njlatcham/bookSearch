import React from 'react';
import ReactDOM from 'react-dom/client';
import BookComponent from './bookComponent.jsx'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearchQuery: '',
      bookVersionObj: [],
      isbn: "039548930X",
      isLoading: false,
      isbnResponse: {},
    }

    // this.sendSearchQuery = this.sendSearchQuery.bind(this);
  }

  updateSearchQuery = (event) => {
    let searchInput = event.target.value
    let searchQuery = searchInput.replace(/\s/g, "+")

    this.setState({bookSearchQuery: searchQuery})
  }

  sendSearchQuery = (event) => {
    event.preventDefault()
    this.setState({bookVersionObj: {}})

    fetch(`http://openlibrary.org/search.json?q=${this.state.bookSearchQuery}`)
    .then(response => response.json())
    .then(response => this.setState({bookVersionObj: response.docs}))
    .catch(error => console.log(error))

    // fetch(`http://openlibrary.org/api/volumes/brief/isbn/039548930X.json`, {
    //
    // })
    // .then(response => response)
    // .then(response => this.setState({isbnResponse: response}))
    // .catch(error => console.log(error))
  }
  

  checkBookObj = () => {
    console.log(this.state.bookVersionObj)
    console.log(this.state.isbnResponse)
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
          <div>{this.state.isLoading ? "loading..." : "not loading yet"}</div>
          {this.state.bookVersionObj.length > 0 ? this.state.bookVersionObj.map((book, i) => 
            <BookComponent book={book} key={i}/>
          ) : ""}

          {/*<div class="ol_readapi_book" isbn="039471752X" lccn="75009828"></div>*/}
        </header>
      </div>
    );
  }
}

export default App;
