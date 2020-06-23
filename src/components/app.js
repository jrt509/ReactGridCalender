import React, { Component } from 'react';
import Header from "./header"
import Footer from "./footer"
import Content from "./content/content"

// const data = [
//   {
//     id: 0,
//     month: "January",
//     daysInMonth: 31,
//     daysInPreviousMonth: 31,
//     startDay: 3,
//     year: 2020
//   },
//   {
//     id: 1,
//     month: "February",
//     daysInMonth: 29,
//     daysInPreviousMonth: 31,
//     startDay: 6,
//     year: 2020
//   },
//   {
//     id: 2,
//     month: "March",
//     daysInMonth: 31,
//     daysInPreviousMonth: 29,
//     startDay: 0,
//     year: 2020
//   },
  
//   {
//     id: 3,
//     month: "April",
//     daysInMonth: 30,
//     daysInPreviousMonth: 31,
//     startDay: 3,
//     year: 2020
//   },
  
//   {
//     id: 4,
//     month: "May",
//     daysInMonth: 31,
//     daysInPreviousMonth: 30,
//     startDay: 5,
//     year: 2020
//   },
//   {
//     id: 5,
//     month: "June",
//     daysInMonth: 30,
//     daysInPreviousMonth: 31,
//     startDay: 1,
//     year: 2020
//   },
//   {
//     id: 6,
//     month: "July",
//     daysInMonth: 31,
//     daysInPreviousMonth: 30,
//     startDay: 3,
//     year: 2020
//   },
//   {
//     id: 7,
//     month: "August",
//     daysInMonth: 31,
//     daysInPreviousMonth: 31,
//     startDay: 6,
//     year: 2020
//   },
//   {
//     id: 8,
//     month: "September",
//     daysInMonth: 30,
//     daysInPreviousMonth: 31,
//     startDay: 2,
//     year: 2020
//   },
//   {
//     id: 9,
//     month: "October",
//     daysInMonth: 31,
//     daysInPreviousMonth: 30,
//     startDay: 4,
//     year: 2020
//   },
//   {
//     id: 10,
//     month: "November",
//     daysInMonth: 30,
//     daysInPreviousMonth: 31,
//     startDay: 0,
//     year: 2020
//   },
//   {
//     id: 11,
//     month: "December",
//     daysInMonth: 31,
//     daysInPreviousMonth: 30,
//     startDay: 2,
//     year: 2020
//   }
// ]

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      position: "",
      month: "",
      daysInMonth: "",
      daysInPreviousMonth: "",
      startDay: "",
      year: ""
    }
    this.handleMonthChange = this.handleMonthChange.bind(this)
  }
  componentDidMount() {
    
    fetch("http://127.0.0.1:5000/month/get", { method: "GET"})
    .then(response => response.json())
    .then(data => {
      
      const month = data[1]
      
      this.setState({
        data: data,
        position: month.position,
        month: month.month,
        daysInMonth: month.daysInMonth,
        daysInPreviousMonth: month.daysInPreviousMonth,
        startDay: month.startDay,
        year: month.year
    })
  })
    .catch(error => console.log(error))
} 

  handleMonthChange(direction) {
    const month = direction === "+" 
                  ? this.state.data[this.state.position + 1]
                  : this.state.data[this.state.position - 1]
    this.setState({
      position: month.position,
      month: month.month,
      daysInMonth: month.daysInMonth,
      daysInPreviousMonth: month.daysInPreviousMonth,
      startDay: month.startDay,
      year: month.year
      })
    
  }
  render() {
    return (
      <div className='app'>
        <Header month={this.state.month} handleMonthChange={this.handleMonthChange}/>
        <Content
          daysInMonth={this.state.daysInMonth}
          daysInPreviousMonth={this.state.daysInPreviousMonth} 
          startDay={this.state.startDay}
          month={this.state.month}
          year={this.state.year}
        />
        <Footer year={this.state.year} />
      </div>
    );
  }
}
