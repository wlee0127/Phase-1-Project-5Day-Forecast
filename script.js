
function weatherData(){
    //5 day forecast API
    const api_weather = "https://api.openweathermap.org/data/2.5/forecast?q=";
    //API key
    const api_key = "640535654e67f478602e4d33c98a6724";
    //assign user input value to the "location" variable
    let location = document.getElementById("cityInput").value;
    

    //api call #1 -- for current weather condition
    fetch(api_weather+location+"&appid="+api_key)
     .then((response) => {
        if (response.ok) return response.json();
        else throw new Error(document.getElementById("citylocation").textContent = response.status + " try a different city");
     }) 
     .then((data) => {
        let groupedDateAndTemp = groupDateAndTemp(data);
        let icon01 = data.list[0].weather[0].icon;
        let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";
        document.getElementById("current01").src= current01src;
        document.getElementById("current01description").textContent = data.list[0].weather[0].description;

        card0(data,groupedDateAndTemp);
     })
     .catch((error) => console.log(error)) 
    }

document.addEventListener('keydown',function(event){
    const pressedKey=event.key;
    if (pressedKey==='Enter'){
        weatherData();
    }
});

function groupDateAndTemp(data) {
    let object = data.list;
    let dateAndTemp = [];
    let groupedDateAndTemp = [];
    
    for(const element of object) {
        let initialObject = {};
        //push object.dt_txt to initial object 
        let dateinit = element.dt_txt;
        let dateString = dateinit.substr(0,10);
        initialObject.date = dateString;
        //push object.main.max_temp to inital object
        initialObject.maxTemp = (element.main.temp_max);
        //push object.main.min_temp to inital object
        initialObject.minTemp = (element.main.temp_min);
        dateAndTemp.push(initialObject);
    }
    console.log(dateAndTemp);
    
    for(let i=0; i<=dateAndTemp.length-1; i++){
        let targetDate = dateAndTemp[i].date;
        if(i>=1) {
            let counter = groupedDateAndTemp.filter(item => item.date===targetDate);
                if(counter.length>0) {
                    continue;
                } else {
                    let temperaturesForDate = dateAndTemp.filter(item => item.date===targetDate);
                    
                    let maxTempInit = [];
                    let minTempInit = [];
                        for(const item of temperaturesForDate){
                            maxTempInit.push(item.maxTemp);
                            minTempInit.push(item.minTemp);
                        }
                    let objectInit = {
                        date: targetDate,
                        maxTemp: maxTempInit,
                        minTemp: minTempInit,
                    };
                    
                    groupedDateAndTemp.push(objectInit); 
                    console.log(groupedDateAndTemp);
                }  
        } else {
            let temperaturesForDate = dateAndTemp.filter(item => item.date===targetDate);
            
            let maxTempInit = [];
            let minTempInit = [];
                for(const item of temperaturesForDate){
                    maxTempInit.push(item.maxTemp);
                    minTempInit.push(item.minTemp);
                }
            let objectInit = {
                date: targetDate,
                maxTemp: maxTempInit,
                minTemp: minTempInit,
            };
            
            groupedDateAndTemp.push(objectInit);
            console.log(groupedDateAndTemp); 
        }
    
    }
    return groupedDateAndTemp;
}

function average(array) {
    let sum = array.reduce(
        (accumulator,current) => accumulator+current,
        0,
    );
    let average = sum/array.length;
    average = (average-273.15)*(9/5)+32;
    return average;
}

function kelvinToFahr(temp) {
    let result = (temp-273.15)*(9/5)+32;
    result = result.toString();
    result = result.substr(0,4);
    return result;
}

function card0(data,groupedDateAndTemp) {
    let date0 = groupedDateAndTemp[0].date;
    let date0String = date0.substr(0,10);

    document.getElementById("citylocation").textContent = `${data.city.name},`;
    document.getElementById("country").textContent = data.city.country;
    document.getElementById("date").textContent = date0String;
    let array1 = groupedDateAndTemp[0].maxTemp;
    let array2 = groupedDateAndTemp[0].minTemp;
    let max = Math.max(...array1);
    let min = Math.min(...array2);
    document.getElementById("maxTemp").textContent = `Max: ${kelvinToFahr(max)} F`;
    document.getElementById("minTemp").textContent = `Min: ${kelvinToFahr(min)} F`;
}

function card1(data,groupedDateAndTemp) {
    let date1 = groupedDateAndTemp[1].date;
    let date0String = date0.substr(0,10);

    document.getElementById("date").textContent = date0String;
    let array1 = groupedDateAndTemp[0].maxTemp;
    let array2 = groupedDateAndTemp[0].minTemp;
    let max = Math.max(...array1);
    let min = Math.min(...array2);
    document.getElementById("maxTemp").textContent = `Max: ${kelvinToFahr(max)} F`;
    document.getElementById("minTemp").textContent = `Min: ${kelvinToFahr(min)} F`;
}