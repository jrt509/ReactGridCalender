import React from 'react'
import CalendarBox from "./calendarBox"

export default function calendarBoxesWrapper(props) {
    const renderBoxes = () => {
        const boxesContainer = []

        for (let i=1; i<=props.startDay; i++) {
            let date = props.daysInPreviousMonth - (props.startDay - i)

            boxesContainer.push(
                <CalendarBox key={`P${i}`}date={date} />
            )
        }
        

        for (let i=1; i<=props.daysInMonth; i++) {
            boxesContainer.push(
                <CalendarBox key={i} date={i} />
            )
        }
        for (let i=1; i<=(42 - (props.startDay + props.daysInMonth)); i++) {
                boxesContainer.push(
                    <CalendarBox key={`N${i}`}date={i}/>
                )
        }
        return boxesContainer
    }

    return (
        <div className="calendar-boxes-wrapper">
            {renderBoxes()}
        </div>
    )
}
    