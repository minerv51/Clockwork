import '../styles/Pomodoro.css'
import alarmSound from '../assets/Alarm Clock Sound Bite.mp3'
import { Play, Pause, RotateCcw, ArrowRightCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTimer } from 'react-timer-hook'

const PomodoroTimer = ({ expiryTimestamp }) => {

    const [formData, setFormData] = useState({
        workTime: '',
        shortBreak: '',
        longBreak: '',
        numOfCycles: ''
    });
    const formRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [workSession, setWorkSession] = useState('Work Session')
    const [workCycles, setWorkCycles] = useState(4)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        //Set the status of the timer submission to true
        setSubmitted(true);

        //Set the status of the reset to false
        setReset(false);

        //Set the work status
        setWorkSession('Work Session')

        //Convert the workTime, shortBreak, and longBreak into seconds
        const workTimeInSeconds = Number(formData.workTime) * 60;
        const shortBreakInSeconds = Number(formData.shortBreak) * 60;
        const longBreakInSeconds = Number(formData.longBreak) * 60;

        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + workTimeInSeconds);

        //Use the restart function to update the timer
        restart(newExpiry)
    }

    const numOfCycles = Number(formData.numOfCycles);

    const workTimeInSeconds = Number(formData.workTime) * 60;
    const shortBreakInSeconds = Number(formData.shortBreak) * 60;
    const longBreakInSeconds = Number(formData.longBreak) * 60;

    const sound = new Audio(alarmSound)

    const {
        totalSeconds,
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ 
        expiryTimestamp, 
        autoStart: false, 
        onExpire: () => {     
            
            sound.play()

            setTimeout(() => {
                setWorkCycles(prevCycles => {

                    let newCycles = prevCycles
    
                    console.log(`
                        Work Session: ${workSession}, ${typeof workSession}
                        Current Cycle: ${newCycles}, ${typeof newCycles}
                        Number of Cycles: ${numOfCycles}, ${typeof numOfCycles}
                        `)
    
                    console.log(workSession === 'Short Break')
                    console.log(newCycles === 0)
                    console.log(numOfCycles !== 0)
    
                    if (workSession === 'Work Session' && newCycles !== 0) {
    
                        //Debug
                        console.log('Conditional Statement 1 has been triggered.')
    
                        setWorkSession('Short Break')
        
                        const newExpiry = new Date();
                        newExpiry.setSeconds(newExpiry.getSeconds() + shortBreakInSeconds)
        
                        restart(newExpiry)
                    } else if ((workSession === 'Short Break'  || workSession === 'Long Break') && newCycles !== 0) {
    
                        //Debug
                        console.log('Conditional Statement 2 has been triggered.')
    
                        newCycles = prevCycles - 1;
    
                        setWorkSession('Work Session')
        
                        const newExpiry = new Date();
                        newExpiry.setSeconds(newExpiry.getSeconds() + workTimeInSeconds)
        
                        restart(newExpiry)
                    } else if (workSession === 'Work Session' && newCycles === 0 && numOfCycles !== 0) {
    
                        //Debug
                        console.log('Conditional Statement 3 has been triggered.')
    
                        newCycles = prevCycles - 1;
    
                        setWorkSession('Long Break')
        
                        const newExpiry = new Date();
                        newExpiry.setSeconds(newExpiry.getSeconds() + longBreakInSeconds)
        
                        restart(newExpiry)
    
                        //Set the work sessions back to 4
                        setWorkCycles(4)
                    } else if (workSession === 'Work Session' && newCycles === 0 && numOfCycles === 0) {
    
                        //Debug
                        console.log('Conditional Statement 4 has been triggered.')
    
                        setWorkSession('Work Session Completed')
                    }
    
                    return newCycles;
                });
            }, 5000);
        }, 
        interval: 20 });

    const formatTwoDigits = (num) => String(num).padStart(2, '0')

    const handleReset = () => {

        //Initialize if the timer has been reset
        setReset(true);

        //Set the work session to "Work Session"
        setWorkSession("Work Session")

        //Set the current cycle to 4
        setWorkCycles(4)

        //Create a new expiry timestamp based on the current time + workTimeInSeconds
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + workTimeInSeconds) //workTimeInSeconds was initialized in the handleSubmit function
    
        restart(newExpiry, false);
    }

    return(
        <div className="pomodoroTimer">
            <h1 id='pageTitle'>Pomodoro Timer</h1>
            <div className='pageModules'>
                <div className='startPauseModule'>
                    {(!submitted || reset) && (
                        <button className='timerButton' id='startButton' type='submit' onClick={() => formRef.current.requestSubmit()}><Play className='timerIcons' size={30}/>Start</button>
                    )}
                    {submitted && !reset && (
                        <button className='timerButton' id='resumeButton' type='button' onClick={resume}><ArrowRightCircle size={30} className='timerIcons'/>Resume</button>
                    )}                    
                    <button className='timerButton' id='pauseButton' type='button' onClick={pause}><Pause className='timerIcons' size={30}/>Pause</button>
                    <button className='timerButton' id='resetButton' type='button' onClick={handleReset}><RotateCcw className='timerIcons' size={30}/>Reset</button>
                </div>
                <div className='timerModule'>
                    <div className='stopwatch'>
                        <h2 id='timer'><span>{formatTwoDigits(minutes)}</span>:<span>{formatTwoDigits(seconds)}</span></h2>
                        <h4 id='sessionType'>{workSession}</h4>
                    </div>
                </div>
                <div className='timerSettingsModule'>
                    <form className='timerSettingsForm' ref={formRef} onSubmit={handleSubmit}>
                        <div className='numberInput'>
                            <label htmlFor='workTime'>Work Time (Min):</label>
                            <input required type='number' id='workTime' name='workTime' value={formData.workTime} onChange={handleChange}/>
                        </div>
                        <div className='numberInput'>
                            <label htmlFor='shortBreak'>Short Break (Min):</label>
                            <input required type='number' id='shortBreak' name='shortBreak' value={formData.shortBreak} onChange={handleChange}/>
                        </div>
                        <div className='numberInput'>
                            <label htmlFor='longBreak'>Long Break (Min):</label>
                            <input required type='number' id='longBreak' name='longBreak' value={formData.longBreak} onChange={handleChange}/>
                        </div>
                        <div className='numberInput'>
                            <label htmlFor='numOfCycles'>Number of Cycles:</label>
                            <input required type='number' id='numOfCycles' name='numOfCycles' min='1' value={formData.numOfCycles} onChange={handleChange}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
    )
};

export default function Pomodoro() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    return(
        <div>
            <PomodoroTimer expiryTimestamp={time} />
        </div>
    )
}