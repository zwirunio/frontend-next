"use client";

import {useContext} from "react";
import {AuthContext} from "@/contexts/auth-context-provider";

function CalendarDay({day}) {
  if ( day > 0 ) {
    return (
      <li className={"p-2 max-w-10 h-10 bg-blue-700 text-gray-950"}>
        <span>{day}</span>
      </li>
    );
  } else {
    return (<li className={"max-w-10 h-10 border border-blue-700 text-gray-950"}>
      <span>{day}</span>
    </li>)
  }
}

function CalendarMonth({month, year}) {
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400===0;


  let numbersOfDaysInMonth = [
    31, // January
    isLeapYear(year) ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ]
  let daysArray = [];

  const getWeekday = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.getDay();
  }

  let firstDayOfMonthWeekday = getWeekday(year+"-"+month+"-01");

  const numberOfDaysInMonth = numbersOfDaysInMonth[month - 1];


  for(let day = 2 - firstDayOfMonthWeekday; day <= numberOfDaysInMonth;day++)
  {
    daysArray.push(<CalendarDay key={day} day={day}/>);
  }


  return (
    <ul className={"grid grid-cols-7 gap-7"}>
      {daysArray}
    </ul>
  );
}

function CalendarYear() {
  let year = 2025;
  return (
    <div className={"grid grid-cols-1"}>
      {Array.from(
        {length: 12},
        (_, i) => i + 1
      ).map(
        (month) => (
          <>
          <li>{month}</li>
          <CalendarMonth key={month} month={month} year={year}/>
          </>
  )
)
}

</div>
)
}

function DailyPlanner() {



  return (<>
    ksksk
  </>);
}

function TeacherPage() {
  const authContext = useContext(AuthContext);


  return (
    <>
      <h1>Teacher Panel</h1>
      <div className={"flex"}>
      {/*<div className={"w-2/3"}>*/}
      {/*  /!*<CalendarYear />*!/*/}
      {/*</div>*/}
        <div className={"w-3/3"}>
          <ul className={"flex flex-col"}>
            <DailyPlanner/>
          </ul>

        </div>


      </div>

    </>
  );
}

export default TeacherPage;