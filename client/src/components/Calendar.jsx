import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const myEventsList = [{
  'title': 'DTS STARTS',
  'start': new Date(2020, 7, 13, 0, 0, 0),
  'end': new Date(2020, 7, 20, 0, 0, 0),
},
{
  'title': 'DTS ENDS',
  'start': new Date(2020, 10, 6, 0, 0, 0),
  'end': new Date(2020, 10, 13, 0, 0, 0),
},
{
  'title': 'Conference',
  'start': new Date(2021, 3, 11),
  'end': new Date(2021, 3, 13),
  'desc': 'Big conference for important people',
},
{
  'title': 'Meeting',
  'start': new Date(2021, 3, 12, 10, 30, 0, 0),
  'end': new Date(2021, 3, 12, 12, 30, 0, 0),
  'desc': 'Pre-meeting meeting, to prepare for the meeting',
}];

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 550, width: 900 }}
    />
  </div>
);

export default MyCalendar;
