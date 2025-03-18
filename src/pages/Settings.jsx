import React from 'react';
import '../styles/Settings.css';
import { useState } from 'react';
import '../styles/Global.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Settings = ({ setGlobalTimeFormat }) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark"); //Default to dark mode
    const [timeFormat, setTimeFormat] = useState(localStorage.getItem("timeFormat") || "12") // Default to 12 Hour Time
    const navigate = useNavigate();

    // Function to update theme when user selects an option
    const handleThemeChange = (event) => {
        setTheme(event.target.value); // Update state when user selects a theme
    };

    // Function to update the time format when the user selects an option
    const handleTimeFormatChange = (event) => {
        const selectedFormat = event.target.value;
        setTimeFormat(selectedFormat);
        localStorage.setItem("timeFormat", selectedFormat);
    };

    //Apply the theme to the document body when the save settings button is pressed
    const handleSaveSettings = (event) => {
        event.preventDefault();

        //Apply the theme changes
        document.body.className = theme;
        localStorage.setItem("theme", theme);

        //Save the time format to local storage
        localStorage.setItem("timeFormat", timeFormat)

        // Update global time format state so clock updates immediately
        if (setGlobalTimeFormat) setGlobalTimeFormat(timeFormat);

        //Navigate back to the home page
        navigate('/');

    }
    


    return (
        <div className='settings'>
            <h1 id='pageTitle'>Settings</h1>
            <form className='settingsForm' onSubmit={handleSaveSettings}>
                <div className='settingsInput'>
                    <label htmlFor="timeFormat">Time Format:</label>
                    <select id="timeFormat" name="timeFormat" value={timeFormat} onChange={handleTimeFormatChange}>
                        <option value="12">12-hour</option>
                        <option value="24">24-hour</option>
                    </select>
                </div>
                <div className='settingsInput'>
                    <label htmlFor="theme">Theme:</label>
                    <select id="theme" name="theme" value={theme} onChange={handleThemeChange}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <button id='submitButton' type="submit">Save Settings</button>
            </form>
            <h6 id='versionName'>Version 1.1.2-Alpha</h6>
        </div>
    );
};

export default Settings;