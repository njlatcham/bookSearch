import React from 'react';
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearchQuery: '',
      bookVersionObj: {},
      isLoading: false
    }

    // this.sendSearchQuery = this.sendSearchQuery.bind(this);
  }

  // componentDidMount() {

  // }

  // componentWillUnmount() {
  //   this.setState({bookSearchQuery: ''})
  // }

  updateSearchQuery = (event) => {
    let searchInput = event.target.value
    let searchQuery = searchInput.replace(/\s/g, "+")
    console.log(searchQuery)

    this.setState({bookSearchQuery: searchQuery})
  }

  sendSearchQuery = (event) => {
    event.preventDefault()
    this.setState({bookVersionObj: {}})
    // console.log(this.state.bookSearchQuery)
    this.setState({isLoading: true})

    fetch(`http://openlibrary.org/search.json?q=${this.state.bookSearchQuery}`)
    .then(response => response.json())
    .then(response => this.setState({bookVersionObj: response}))
    .then(this.setState({isLoading: false}))
    .catch(error => console.log(error))
  }

  checkBookObj = () => {
    console.log(this.state.bookVersionObj)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.sendSearchQuery}>
            <input type="text" onChange={this.updateSearchQuery}/>
            <button>Submit</button>
          </form>
          <h4 onClick={this.checkBookObj}>check</h4>
          <div>{this.state.isLoading ? "loading..." : "not loading yet"}</div>
          <div></div>
        </header>
      </div>
    );
  }
}

export default App;
