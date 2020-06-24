import React, { Component } from 'react';


export default class CalendarBox extends Component {
    constructor(props) {
        super()

        this.state = {
            text: ""
        }
        this.handleChange =this.handleChange.bind(this)
    }
    componentDidMount() {
        if (!this.props.overflow) {
           this.getReminderData()
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.month !== this.props.month){
            if (!this.props.overflow) {
                this.getReminderData()
            }
        }
    }

    getReminderData() {
        const { date, month, year} = this.props
        fetch(`http://127.0.0.1:5000/reminder/get/${date}/${month}/${year}`, { method: "GET"})
        .then(response => response.json())
        .then(data => {
            if(data.text) {
                this.setState({ text: data.text })
            }
            else {
                this.setState({ text: ""})
            }
        })
        .catch(error => console.log(error))
    }

    handleChange(event) {
        this.setState({ text: event.target.value })
    }
    handleSubmit() {
        fetch("http://127.0.0.1:5000/reminder/add", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({ 
                text: this.state.text,
                date: this.props.date,
                month: this.props.month,
                year: this.props.year
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div className={`calendar-box ${this.props.overflow ? "overflow-day" : ""}`}>
                <div className="date">
                    {this.props.date}
                </div>
                <textarea
                    disabled={this.props.overflow} 
                    value={this.state.text}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    ></textarea>
            </div>
        )
    }
}
