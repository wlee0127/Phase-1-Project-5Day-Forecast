//declare a "darg" variable that will be of use in the drag function
let dragging = false;
//these variables holds the displace value of the drag object.  Will be of use in the drag function.
let offsetX = null;
let offsetY = null;
const newDiv = document.getElementById("weatherContainer01");


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
    
        card0(data,groupedDateAndTemp);
     })
     .catch((error) => console.log(error)) 
    }

document.addEventListener("keydown",function(event){
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

function maxTemp(groupedDateAndTemp) {
    let array1 = groupedDateAndTemp[0].maxTemp;
    let max = Math.max(...array1);
    max = (max-273.15)*(9/5)+32;
    max = max.toString();
    max = max.substr(0,4);
    return max;
}

function minTemp(groupedDateAndTemp) {
    let array1 = groupedDateAndTemp[0].minTemp;
    let max = Math.min(...array1);
    max = (max-273.15)*(9/5)+32;
    max = max.toString();
    max = max.substr(0,4);
    return max;
}

function card0(data,groupedDateAndTemp) {
    let icon01 = data.list[0].weather[0].icon;
    let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";

    const newDiv = document.createElement('div');
    newDiv.class = "card";
    newDiv.id = "weatherContainer01";
    document.body.appendChild(newDiv);

    const heading3 = document.createElement("h3");
    newDiv.appendChild(heading3);

    const span00 = document.createElement("span");
    span00.id = "citylocation";
    span00.textContent = `${data.city.name},`;
    heading3.appendChild(span00);

    const span01 = document.createElement("span");
    span01.id = "country";
    span01.textContent = data.city.country;
    heading3.appendChild(span01);

    const img0 = document.createElement("img");
    img0.id = "current01";
    img0.src = current01src;
    newDiv.appendChild(img0);

    const heading5 = document.createElement("h5");
    newDiv.appendChild(heading5);

    const p00 = document.createElement("p");
    p00.id = "maxTemp";
    p00.textContent = `Max: ${maxTemp(groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp";
    p01.textContent = `Min: ${minTemp(groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    const p02 = document.createElement("p");
    p02.id = "date0";
    p02.textContent = groupedDateAndTemp[0].date;
    heading5.appendChild(p02);

    let dragging = false;
    //these variables holds the displace value of the drag object.  Will be of use in the drag function.
    let offsetX = null;
    let offsetY = null;

    newDiv.addEventListener("mousedown", function(event){
        dragging = true;
        //calculate offset x and y value.  These values will be passed to mousemove event listener.
        offsetX = event.clientX-newDiv.getBoundingClientRect().left;
        offsetY = event.clientY-newDiv.getBoundingClientRect().top;
    });
    
    document.addEventListener("mousemove", function(event){
        if (dragging) {
            let x = event.clientX-offsetX;
            let y = event.clientY-offsetY;
    
            newDiv.style.left = x+"px";
            newDiv.style.top = y+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
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