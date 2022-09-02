/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '7456412c3b42778d45e04eaafe8bb3dd&units=imperial';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', queueData);

/* Function called by event listener */

function queueData(){
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    console.log(content)
    console.log(zipcode)
    getClimate(baseURL, zipcode, key)
    .then(function (data){
        postData('http://localhost:4202/added_data', {city: data.name, temperature: data.main.temp, date: newDate, user_response: feelings} )
        .then(function() {
            updateUI()
        });
    });
};

/* Function to GET Web API Data*/

const getClimate = async (baseURL, code, key)=>{
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(response);
    try {
        const inputteddata = await response.json();
        console.log(inputteddata);
        return inputteddata;
    } catch(error) {
        console.log('Oops an error!', error);
    }
}

// POST function for posting weather data

const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Oops an error!', error);
    }
}

const updateUI = async () => {
    const req = await fetch('http://localhost:4202/all_data');
    try {
        const allData = await req.json();
        document.getElementById('location').innerHTML = "You are in " + allData.city;
        document.getElementById('date').innerHTML = "Today's date is: " + allData.date; 
        document.getElementById('temp').innerHTML = "The temperature right now is " + allData.temperature;
        document.getElementById('content').innerHTML = "You are feeling " + allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}