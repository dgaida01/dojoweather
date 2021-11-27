
let splashLocal = "New Jersey";
let Locals = [
            ["Los Angeles","Chicago","Dallas", "New Jersey"],
            [ "90028","60624","75216","07030"]
            ];



async function getWeather(_callback) {
    let adjLocal1="http://api.weatherapi.com/v1/forecast.json?key=a49551a455564d14bff153720212311&q=";
    let adjLocal2 ="07030";
    let adjLocal3 ="&days=3&aqi=no&alerts=no";

    let zipSelect = Locals[0].indexOf(splashLocal);
    adjLocal2 = Locals[1][zipSelect];



    let response = await fetch(adjLocal1+adjLocal2+adjLocal3);
    let data = await response.json();
    
    console.log(data);
    _callback(data);
}

function chgSplashLocal(newLocal){
    let swapLocals = Locals[0].indexOf(newLocal.innerText); 
    console.log(Locals[0].indexOf(newLocal.innerText)); 
    newLocal.innerText = document.getElementById("weatherLocation").innerText;
    splashLocal = Locals[0][swapLocals];
    document.getElementById("weatherLocation").innerText =Locals[0][swapLocals];

    getWeather(updatePage)
}


function updatePage(data) {
    let degree;
    if(document.querySelector("#tempControle").innerText =="C°"){
        degree="c"
    }
    else{
        degree="f"
    }

//    Today; 
  document.querySelector("#today img").src = "http:" + data.forecast.forecastday[0].day.condition.icon;
  document.querySelector("#today .card-text").innerText = data.forecast.forecastday[0].day.condition.text;
  document.querySelector("#today .high").innerText = eval("data.forecast.forecastday[0].day.maxtemp_"+ degree)+"°";
  document.querySelector("#today .low").innerText = eval("data.forecast.forecastday[0].day.mintemp_"+ degree)+"°";
  document.querySelector("#today .feels-high").innerText = eval("data.forecast.forecastday[0].hour[12].feelslike_"+degree)+"°";
  document.querySelector("#today .feels-low").innerText = eval("data.forecast.forecastday[0].hour[0].feelslike_"+degree)+"°";

//  Tomorrow
  document.querySelector("#tomorrow img").src = "http:" +data.forecast.forecastday[1].day.condition.icon;
  document.querySelector("#tomorrow .card-text").innerText = data.forecast.forecastday[1].day.condition.text;
  document.querySelector("#tomorrow .high").innerText = eval("data.forecast.forecastday[1].day.maxtemp_"+ degree) +"°";
  document.querySelector("#tomorrow .low").innerText = eval("data.forecast.forecastday[1].day.mintemp_"+ degree) +"°";
  document.querySelector("#tomorrow .feels-high").innerText = eval("data.forecast.forecastday[1].hour[12].feelslike_"+degree) +"°";
  document.querySelector("#tomorrow .feels-low").innerText = eval("data.forecast.forecastday[1].hour[0].feelslike_"+degree) +"°";

//   extended one more day
  document.querySelector("#ext1 img").src = "http:" +data.forecast.forecastday[2].day.condition.icon;
  document.querySelector("#ext1 .card-text").innerText = data.forecast.forecastday[2].day.condition.text;
  document.querySelector("#ext1 .high").innerText = eval("data.forecast.forecastday[2].day.maxtemp_"+ degree) +"°";
  document.querySelector("#ext1 .low").innerText = eval("data.forecast.forecastday[2].day.mintemp_"+ degree) +"°";
  document.querySelector("#ext1 .feels-high").innerText = eval("data.forecast.forecastday[2].hour[12].feelslike_"+degree) +"°";
  document.querySelector("#ext1 .feels-low").innerText = eval("data.forecast.forecastday[2].hour[0].feelslike_"+degree) +"°";

//   extended 2 days out
document.querySelector("#ext2 img").src = "http:" +data.forecast.forecastday[2].hour[23].condition.icon;
document.querySelector("#ext2 .card-text").innerText = data.forecast.forecastday[2].hour[23].condition.text;
document.querySelector("#ext2 .high").innerText = eval("data.forecast.forecastday[2].hour[15].temp_"+ degree) +"°";
document.querySelector("#ext2 .low").innerText = eval("data.forecast.forecastday[2].hour[23].temp_"+ degree) +"°";
document.querySelector("#ext2 .feels-high").innerText = eval("data.forecast.forecastday[0].hour[15].feelslike_"+degree) +"°";
document.querySelector("#ext2 .feels-low").innerText = eval("data.forecast.forecastday[0].hour[23].feelslike_"+degree) +"°";

}

function changeDegree(element,temp){
temp.innerText=element.innerText;
getWeather(updatePage)
}


// sets up the page to have the extended days labled correctly based on todays date
function setForcastDays() {

    let element1 = document.getElementById("extend-day1");
    let element2 = document.getElementById("extend-day2");
    console.log(element1);
    console.log(element2);
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    let index = today.getDay() + 2;

    for (i = 0; i < 2; i++) {
        index += i;
        if (index > daysOfWeek.length - 1) {
            index = index - daysOfWeek.length;
        }

        console.log(daysOfWeek[index]);
        if (i == 0) {
            element1.innerText = daysOfWeek[index];

        }
        else {
            element2.innerText = daysOfWeek[index];
        }
    }

}


setForcastDays();
getWeather(updatePage);