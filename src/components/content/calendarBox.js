import React, { Component } from "react"

export default class CalendarBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            dataExists: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (!this.props.overflow) {
            const { date, month, year } = this.props
            fetch(`https://may24th-react-calendar-api-aoj.herokuapp.com/reminder/get/${date}/${month}/${year}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data.text) {
                    this.setState({ 
                        text: data.text,
                        dataExists: true
                    })
                }
            })
            .catch(error => console.log(error))
        }
    }

    handleChange(event) {
        this.setState({ text: event.target.value })
    }

    handleSubmit() {
        let endpoint
        let method
        if (!this.state.dataExists) {
            endpoint = "add"
            method = "POST"
        }
        else if (this.state.text != "") {
            endpoint = "update"
            method = "PUT"
        }
        else {
            endpoint = "delete"
            method = "DELETE"
        }

        fetch(`https://may24th-react-calendar-api-aoj.herokuapp.com/reminder/${endpoint}`, {
            method: method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                text: this.state.text,
                date: this.props.date,
                month: this.props.month,
                year: this.props.year
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ dataExists: method !== "DELETE" ? true : false })
        })
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