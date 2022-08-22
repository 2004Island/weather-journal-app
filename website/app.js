/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const key = '7456412c3b42778d45e04eaafe8bb3dd&units=imperial';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', queuedata);

/* Function called by event listener */

function queuedata(){
  const zipcode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  console.log(feelings)
  console.log(zipcode)
  getClimate(baseUrl, zipcode, key)
  .then(function (data){
    console.log(data.list[0].main.temp);
    console.log(feelings);
    console.log(newDate)
    console.log(data.list[0])
    document.getElementById('temp').innerHTML = 'Weather: ' + data.list[0].main.temp + ' F degrees';
    document.getElementById('content').innerHTML = "How you're feeling: " + feelings;
    document.getElementById('date').innerHTML = 'Date: ' + newDate;
    document.getElementById('city').innerHTML = 'City: ' + data.city.name;
    //postData('/added_data', { date: newDate, temperature: data.list[0].main.temp, feelings } )
})
};

/* Function to GET Web API Data*/

const getClimate = async (baseURL, zipcode, key) => {
  const response = await fetch(baseURL + zipcode + ',us' + '&APPID=' + key);
  try {
    const inputteddata = await response.json();
    console.log(inputteddata);
    return inputteddata;
  } catch (error) {
    console.log("oops! an error", error);
  }
}

// POST function for posting weather data

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log("oops! an error", error);
  }
};

