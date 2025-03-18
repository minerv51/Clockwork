import { retrieveTime } from '../../digitalClock'
import '../styles/Date.css'
import { useState, useEffect } from 'react';

const Date = () => {

    //Create a useState to regularly update the date
    const [date, setDate] = useState(retrieveTime());

    //Create a useEffect to run once the component mounts
    useEffect(() => {
        //Create an interval that updates the date every second
        const intervalId = setInterval(() => {
            setDate(retrieveTime());
        }, 1000);

        //Cleanup function for when the component unmounts
        return () => clearInterval(intervalId);

    }, [])

    return (
        <div className='date'>
            <h3>{date.month} {date.date}, {date.year}</h3>
        </div>
    )
};

export default Date;