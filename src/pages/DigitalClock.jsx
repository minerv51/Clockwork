import HoursMinutesSeconds from "../components/HoursMinutesSeconds";
import Date from '../components/Date'
import '../styles/DigitalClock.css'

const DigitalClock = () => {

    return (
        <div className="clockContainer">
            <div className="digitalClock">
                <HoursMinutesSeconds />
                <Date />
            </div>
        </div>
    )
};

export default DigitalClock;