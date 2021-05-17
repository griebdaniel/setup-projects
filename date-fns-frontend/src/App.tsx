import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { format, getTimezoneOffset, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

function App() {
  const [date, setDate] = useState(new Date()) ;
  const nyDate = utcToZonedTime(date, 'America/New_York');

  console.log(format(date, 'yyyy-MM-dd'));
  // console.log(nyDate);

  return (
    <div className="App">
      <input type="date" value={format(nyDate, 'yyyy-MM-dd')} onChange={e => console.log(e.target.value)}></input>
    </div>
  );
}

export default App;
