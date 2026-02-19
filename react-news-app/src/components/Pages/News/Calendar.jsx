import React, { useState } from 'react'
import './Calendar.css'

const Calendar = () => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentDate = new Date()


  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();


    // Go to previous month (if January → go to December and reduce year)
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  }

  // Go to next month (if December → go to January and increase year)
  const nextMonth = () => {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    setCurrentYear((nextYear) => (currentMonth === 11 ? currentYear + 1 : currentYear));
  }

  return (
    <div className='calendar'>
      {/* Header with month, year and navigation buttons */}
      <div className="navigate-date">

        <div className="buttons">
          <i className="bx bx-chevrons-left" onClick={() => setCurrentYear(prev => prev - 1)}></i>
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
        </div>

        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>

        <div className="buttons">
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          <i className="bx bx-chevrons-right" onClick={() => setCurrentYear(next => next + 1)}></i>
        </div>

      </div>

      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {/* Empty boxes before the 1st day */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <span key={`empty-${i}`}></span>
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNumber = i + 1;
          
          const isToday =
          dayNumber === currentDate.getDate() &&
          currentMonth === currentDate.getMonth() &&
          currentYear === currentDate.getFullYear();

          return (
            <span key={dayNumber} className={isToday ? 'current-day' : ''}>
              {dayNumber}
            </span>
          );
        })}
      </div>

    </div>
  )
}

export default Calendar