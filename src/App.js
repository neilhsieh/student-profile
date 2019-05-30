import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// import SearchBar from './SearchBar'

class HatchwayFront extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      students: [],
      isLoaded: false,
      error: null,
      searchClass: "searchbar",
      searchItem: '',
      button: [],
      grades: [],
      tag: ''
    }

    this.getAverage = this.getAverage.bind(this)
    this.changeSearchClass = this.changeSearchClass.bind(this)
    this.searchList = this.searchList.bind(this)
    this.button = this.button.bind(this)
    this.setGrades = this.setGrades.bind(this)
    this.showTags = this.showTags.bind(this)
    this.newTag = this.newTag.bind(this)

  }



  componentDidMount() {
    axios.get('https://www.hatchways.io/api/assessment/students')
      .then((result) => {

        this.setState({
          students: result.data.students,
          isLoaded: true,
          button: new Array(result.data.students.length).fill('+'),
          grades: new Array(result.data.students.length)
        })
      },

      (error) => {
        this.setState({
          error: true,
          isLoaded: true
        })
      }
      )
  }

  getAverage = marks => {
    var average = marks.reduce((accum, mark) => accum + Number(mark), 0)/marks.length
    return(
      <li>Average: {average}%</li>
    )
  }

  changeSearchClass = () => {
    this.setState({
      searchClass: "searchbar-2"
    })
  }
  
  searchList = (e) => {
    this.setState({
      searchItem: e.target.value
    })
  }

  button = () => {
    if (this.state.button === "+") {
      this.setState({
        button: "-"
      })
    } else {
      this.setState({
        button: '+'
      })
    }
  }

  setGrades = (e) => {
    let studentGrades = this.state.students.find( student => {
      return (
        student.id.includes(e.target.id)
      )
    })
    let showGradeIndex = this.state.grades
    showGradeIndex[studentGrades.id-1] = (showGradeIndex[studentGrades.id-1] === true) ? false : true

    let tempButton = this.state.button
    tempButton[studentGrades.id-1] = (tempButton[studentGrades.id-1] === '+') ? '-' : '+'

    this.setState({
      grades: showGradeIndex,
      button: tempButton
    })
  }

  showGrades = (eachStudent) => {
    if(this.state.grades[eachStudent.id-1] === true) {
      return (
        <div className='grades'>
          <ul>
            {eachStudent.grades.map ( (grade, i) => {
              return (
                <div key={i}>
                  <li className='each-grade'>
                    <div>Test{i+1}:</div>
                    <div id='grade'>{grade}%</div>
                  </li>
                </div>
              )
            })}
          </ul>
          {/* //{this.showTags} */}
          <div>
            <input type='text' placeholder='Add a tag' onChange={this.newTag}></input>
          </div>
        </div>
      )
    }
  }

  newTag =(e) => {
    this.setState({
      tag: e.target.value
    })

    if(e.keyCode === 13) {
      console.log('Entered!')
    }
  }
  
  showTags = (e) => {
    return(
      <div>
        Entered
      </div>
    )
  }

  render () {
    let filtered = this.state.students.filter( student => {
        return (
          (student.firstName.concat(student.lastName)).toLowerCase().includes(this.state.searchItem.toLowerCase())
        )
      })    

    return (
      <div className='App'>
      {/* Searchbar - possibly move to different component */}
      <div className={this.state.searchClass} >
          <input type='text' placeholder='Search by name' id='search' onClick={this.changeSearchClass} onChange={this.searchList}
          value={this.state.searchItem}></input>
      </div>

      {/* Show list */}
        <ul className='student-list'>
          {filtered.map( (student, i) => {
            return(
              <div className='each-student' key={student.id}>
                <div className='profile-pic'>
                  <img src={student.pic} alt='student pic' />
                </div>
                <div className='profile-info'>
                  <div className='student-name'>
                    <li> 
                      {student.firstName} {student.lastName}
                    </li>
                  </div>
                  <div className='student-info'>
                    <li>Email: {student.email}</li>
                    <li>Company: {student.company}</li>
                    <li>Skille: {student.skill}</li>
                    {this.getAverage(student.grades)}
                    {this.showGrades(student)}
                  </div>
                </div>
                <div className='expand-button'>
                  <button id={student.id} type='button' onClick={this.setGrades}>{this.state.button[student.id-1]}</button>
                </div>
              </div> 
            )
          })}
        </ul>
      </div>
    );

  }
}

export default HatchwayFront;