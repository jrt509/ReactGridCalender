import React from 'react';
import DaysWrapper from "./daysWrapper"
import CalendarBoxesWrapper from "./calendarBoxesWrapper"

export default function contentWrapper(props) {
    return (
        <div className="content-wrapper">
            <DaysWrapper />
            <CalendarBoxesWrapper daysInMonth={props.daysInMonth}
                daysInMonth={props.daysInMonth}
                daysInPreviousMonth={props.daysInPreviousMonth}
                startDay={props.startDay}
                month={props.month}
                year={props.year}
                />
        </div>
    )
}