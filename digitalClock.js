//This is a digital clock made with javascript, it currently shows the hour, minute, and second of the current time (EST).
//The format of the time is in 12 hour increments with AM and PM.
//The time is updated every second.

//This function is for retrieving the date and time
export function retrieveTime() {

    //Retrieve the time format information
    var timeFormat = localStorage.getItem("timeFormat") || "12";

    //Get the current date and time
    var currentDate = new Date(Date.now());

    //Split the current date into all of its components
    var year = currentDate.getFullYear();
    var month = currentDate.toLocaleString('en-US', {month: 'long'});
    var date = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = String(currentDate.getMinutes()).padStart(2, '0');
    var seconds = String(currentDate.getSeconds()).padStart(2, '0');

    let timeStatus = null;

    //Determine the time format
    if (timeFormat === '12') {
        ({ hours, timeStatus } = twelveHourTime(hours));
    }

    var formattedHours = String(hours).padStart(2, "0");


    //Create an object that has the date, time, minutes, and seconds
    var timeInformation = {
        year: year,
        month: month,
        date: date,
        hours: formattedHours,
        minutes: minutes,
        seconds: seconds,
        timeStatus: timeStatus,
    };

    //Return the object containing all of the time information
    return timeInformation

}


//This function is for when 12 hour time is being used
//It does the math to determine whether it is AM or PM and what the 12 hour time is
function twelveHourTime(currentHour) {

    //Initialize the variable that gets the current hour and time status
    var timeStatus = "AM";
    var currentTwelveHour = currentHour;

    if (currentHour === 0) {
        currentTwelveHour = 12; // Midnight should be 12 AM
    } else if (currentHour >= 12) {
        timeStatus = "PM";
        if (currentHour > 12) {
            currentTwelveHour = currentHour - 12; // Convert to 12-hour format
        }
    }

    return { hours: currentTwelveHour, timeStatus };
};