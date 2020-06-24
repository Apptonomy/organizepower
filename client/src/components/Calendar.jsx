import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const myEventsList = [{
  title: 'DTS STARTS',
  start: new Date(2016, 2, 13, 0, 0, 0),
  end: new Date(2016, 2, 20, 0, 0, 0),
},

{
  title: 'DTS ENDS',
  start: new Date(2016, 10, 6, 0, 0, 0),
  end: new Date(2016, 10, 13, 0, 0, 0),
},

{
  title: 'Some Event',
  star: new Date(2015, 3, 9, 0, 0, 0),
  end: new Date(2015, 3, 9, 0, 0, 0),
},
{
  title: 'Conference',
  start: new Date(2015, 3, 11),
  end: new Date(2015, 3, 13),
  desc: 'Big conference for important people',
},
{
  title: 'Meeting',
  start: new Date(2015, 3, 12, 10, 30, 0, 0),
  end: new Date(2015, 3, 12, 12, 30, 0, 0),
  desc: 'Pre-meeting meeting, to prepare for the meeting',
}];

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, width: 800 }}
    />
  </div>
);

export default MyCalendar;
