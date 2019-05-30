import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchClass: "searchbar"
    }

    this.changeSearchClass = this.changeSearchClass.bind(this)
  }

  changeSearchClass = () => {
    this.setState({
      searchClass: "searchbar-2"
    })
  }
  
  render() {
    return (
      <div className={this.state.searchClass} >
        <input placeholder='Search by name' id='search' onClick={this.changeSearchClass}></input>
      </div>
    )
  }
}


export default SearchBar;