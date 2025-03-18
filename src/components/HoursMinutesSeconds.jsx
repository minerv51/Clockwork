import { useEffect, useState } from 'react';
import '../styles/HoursMinutesSeconds.css'
import { retrieveTime } from '../../digitalClock';

const HoursMinutesSeconds = () => {

     // ✅ State to update the digital clock
     const [time, setTime] = useState(retrieveTime());

     // ✅ Effect to update time every second
     useEffect(() => {
         const intervalId = setInterval(() => {
             setTime(retrieveTime()); // ✅ Continuously updates the time
         }, 1000);
 
         return () => clearInterval(intervalId); // ✅ Cleanup on unmount
     }, []); // ✅ Runs once on mount


    return (
        <div className='hoursMinutesSeconds'>
            <h1 className='timeStamp'>{time.hours}:{time.minutes}:{time.seconds}</h1>
            {time.timeStatus && <h1 id="timeStatus" className="timeStamp">{time.timeStatus}</h1>}
        </div>
    )
};

export default HoursMinutesSeconds;