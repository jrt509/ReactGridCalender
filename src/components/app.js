import React, { Component } from 'react';

import Header from "./header"
import Footer from "./footer"
import Content from "./content/content"


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
    fetch("https://git.heroku.com/jrt-react-calendar-backend.git", { method: "GET" })
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
        <Header month={this.state.month} handleMonthChange={this.handleMonthChange} />
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