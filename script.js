
document.addEventListener("keydown",function(event){
    const pressedKey=event.key;
    if (pressedKey==='Enter'){
        weatherData();
    }
});

function weatherData() {
    //5 day forecast API
    const api_weather = "https://api.openweathermap.org/data/2.5/forecast?q=";
    //API key
    const api_key = "640535654e67f478602e4d33c98a6724";
    //assign user input value to the "location" variable
    let location = document.getElementById("cityInput").value;
    

    //api call #1 -- for current weather condition
    fetch(api_weather+location+"&appid="+api_key)
     .then((response) => {
        //if response.ok is true (response successful), parse the json and return it as javascript
        if (response.ok) return response.json();
        //else, if response not successful, throw an error message w/ alert box.
        //note, response not successful does not equal an error. If unfound city name is entered, an error is not returned instead an unsuccessful response is returned.
        //the .catch() method will not cath any errors thus we need to use response.ok method for testing
        else throw new Error(window.alert(response.status + " try a different city"));
     }) 
     .then((data) => {
        //using groupDateAndTemp function to sort and group my returned data and assigning the result to variable "groupedDateAndTemp"
        let groupedDateAndTemp = groupDateAndTemp(data);
        //each card function is responsible for generating a weather data container element for a specific date.
        //i am only passing "data" into card0 because only card0 will be displaying the weather icon(pic), which is information stored in "data" and not in my sorted array.
        card0(data,groupedDateAndTemp);
        card2(groupedDateAndTemp);
        card3(groupedDateAndTemp);
        card4(groupedDateAndTemp);
        card5(groupedDateAndTemp);
     })
     //.catch() method will catch network errors, API key errors, URL errors, failure to fetch errors...
     .catch((error) => {console.log(error)}) 
}

function groupDateAndTemp(data) {
    let object = data.list;
    let dateAndTemp = [];
    let groupedDateAndTemp = [];
    //iterating through each element of my object=(data.list)
    for(const element of object) {
        let initialObject = {};
        //only extract the first 10 char of my "element.dt_txt" string
        let dateinit = element.dt_txt;
        let dateString = dateinit.substr(0,10);
        initialObject.date = dateString;
        //declare initialobject.maxtemp 
        initialObject.maxTemp = (element.main.temp_max);
        //declare initialobject.mintemp
        initialObject.minTemp = (element.main.temp_min);
        //push initial object into dateAndTemp array
        dateAndTemp.push(initialObject);
    }
    //console.log(dateAndTemp);
    //iterate through dateAndTemp array. Goal is to group all temperature data by date.
    for(let i=0; i<=dateAndTemp.length-1; i++){
        let targetDate = dateAndTemp[i].date;
        if(i>=1) {
            //filter thru groupedDateAndTemp for targetDate.  if instances of targetDate is greater than 0, continue on to next block of code. 
            let instances = groupedDateAndTemp.filter(element => element.date===targetDate);
                if(instances.length>0) {
                    //if an instance of targetDate already exist in groupedDateAndTemp, skip to next iteration.  All temp data pertaining to that date has
                    //been extracted on a prior iteration when no instances of targetDate existed. 
                    continue;
                } else {
                    //when no instance of targetDate exist (counter.length>0 returns false) run the following operation.
                    let temperaturesForDate = dateAndTemp.filter(element => element.date===targetDate);
                    
                    let maxTempInit = [];
                    let minTempInit = [];
                        for(const element of temperaturesForDate){
                            maxTempInit.push(element.maxTemp);
                            minTempInit.push(element.minTemp);
                        }
                    let objectInit = {
                        date: targetDate,
                        maxTemp: maxTempInit,
                        minTemp: minTempInit,
                    };
                    
                    groupedDateAndTemp.push(objectInit); 
                }  
        } else {
            /*to handle the first iteration when i=0. 
            filter through dateAndTemp and create a copy array of the elements with an element.date value equal to the target date
            */
            let temperaturesForDate = dateAndTemp.filter(element => element.date===targetDate);
            /*
            0:{date: '2023-11-10', maxTemp: 283.23, minTemp: 282.69}
            1:{date: '2023-11-10', maxTemp: 282.86, minTemp: 282.12}
            2:{date: '2023-11-10', maxTemp: 282.82, minTemp: 282.62}
            3:{date: '2023-11-10', maxTemp: 283.42, minTemp: 283.42}
            4:{date: '2023-11-10', maxTemp: 284.01, minTemp: 284.01}
            5:{date: '2023-11-10', maxTemp: 283.31, minTemp: 283.31}
            */
            //push each max and min temp value into an array
            let maxTempInit = [];
            let minTempInit = [];
                for(const element of temperaturesForDate){
                    maxTempInit.push(element.maxTemp);
                    minTempInit.push(element.minTemp);
                }
            let objectInit = {
                date: targetDate,
                maxTemp: maxTempInit,
                minTemp: minTempInit,
            };
            /*
            object consisting of temperature arrays and date will get pushed to the groupedDateAndTemp array.
            "2023-11-10"
            maxTemp: (6) [283.23, 282.86, 282.82, 283.42, 284.01, 283.31]
            minTemp: (6) [282.69, 282.12, 282.62, 283.42, 284.01, 283.31]
            */
            groupedDateAndTemp.push(objectInit); 
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

function maxTemp(i,groupedDateAndTemp) {
    let array1 = groupedDateAndTemp[i].maxTemp;
    let max = Math.max(...array1);
    max = (max-273.15)*(9/5)+32;
    max = max.toString();
    max = max.substr(0,4);
    return max;
}

function minTemp(i,groupedDateAndTemp) {
    let array1 = groupedDateAndTemp[i].minTemp;
    let max = Math.min(...array1);
    max = (max-273.15)*(9/5)+32;
    max = max.toString();
    max = max.substr(0,4);
    return max;
}

function card0(data,groupedDateAndTemp) {
    let icon01 = data.list[0].weather[0].icon;
    let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";
    let i = 0;

    const newDiv = document.createElement('div');
    newDiv.class = "card";
    newDiv.id = "weatherContainer01";
    document.body.appendChild(newDiv);

    const heading3 = document.createElement("h3");
    newDiv.appendChild(heading3);

    const p02 = document.createElement("p");
    p02.id = "date0";
    p02.textContent = groupedDateAndTemp[0].date;
    heading3.appendChild(p02);

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
    p00.textContent = `Max: ${maxTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp";
    p01.textContent = `Min: ${minTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    let dragging = false;
    //these variables holds the displace value of the drag object.  Declaring them as null, will be calling them in the callback functions in mousedown, mousemove.
    let initialX = null;
    let initialY = null;

    newDiv.addEventListener("mousedown", function(event){
        //assign a true value to the dragging variable
        dragging = true;
        /*calculate initial x and y position value relative to the draggable element.  These values will be passed to mousemove event listener.
        initialX is the distance in the x-axis between the current cursor position and the left edge of my element. This is the starting point in reference to the element.
        this dictates where the initial position of the element must be upon the first click of the mouse.  upon first click the element is actuall ybeing repositioned.
        clientRect().left returns the distance in x-axis between the left edge of my element to left edge of window/viewport. 
        initialX = event.clientX;
        initialY = event.clientY;
        */
       
       initialX = event.clientX-newDiv.getBoundingClientRect().left;
       initialY = event.clientY-newDiv.getBoundingClientRect().top;
    });
    
    document.addEventListener("mousemove", function(event){
        //if dragging is true, which was assigned true once mousedown is initiated
        //x is the displacement value, = valueclientx(current x location of cursor relative to edge of viewport) -  offsetx()  
        //its value represents the displacement between the cursor's prior position and the cursors current position
        if (dragging) {
            let dx = event.clientX-initialX;
            let dy = event.clientY-initialY;
    
            newDiv.style.left = dx+"px";
            newDiv.style.top = dy+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
}

function card2(groupedDateAndTemp) {
    let i = 1;

    const newDiv2 = document.createElement('div');
    newDiv2.class = "forecastCard";
    newDiv2.id = "weatherContainer02";
    document.body.appendChild(newDiv2);

    const heading5 = document.createElement("h5");
    newDiv2.appendChild(heading5);

    const p02 = document.createElement("p");
    p02.id = "date2";
    p02.textContent = groupedDateAndTemp[1].date;
    heading5.appendChild(p02);

    const p00 = document.createElement("p");
    p00.id = "maxTemp2";
    p00.textContent = `Max: ${maxTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp2";
    p01.textContent = `Min: ${minTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    let dragging = false;
    let initialX = null;
    let initialY = null;

    newDiv2.addEventListener("mousedown", function(event){
        dragging = true;
        initialX = event.clientX-newDiv2.getBoundingClientRect().left;
        initialY = event.clientY-newDiv2.getBoundingClientRect().top;
    });
    
    document.addEventListener("mousemove", function(event){
        if (dragging) {
            let dx = event.clientX-initialX;
            let dy = event.clientY-initialY;
    
            newDiv2.style.left = dx+"px";
            newDiv2.style.top = dy+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
    
}

function card3(groupedDateAndTemp) {
    let i = 2;

    const newDiv3 = document.createElement('div');
    newDiv3.class = "forecastCard";
    newDiv3.id = "weatherContainer03";
    document.body.appendChild(newDiv3);

    const heading5 = document.createElement("h5");
    newDiv3.appendChild(heading5);

    const p02 = document.createElement("p");
    p02.id = "date3";
    p02.textContent = groupedDateAndTemp[i].date;
    heading5.appendChild(p02);

    const p00 = document.createElement("p");
    p00.id = "maxTemp3";
    p00.textContent = `Max: ${maxTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp3";
    p01.textContent = `Min: ${minTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    let dragging = false;
    let initialX = null;
    let initialY = null;

    newDiv3.addEventListener("mousedown", function(event){
        dragging = true;
        debugger;
        initialX = event.clientX-newDiv3.getBoundingClientRect().left;
        initialY = event.clientY-newDiv3.getBoundingClientRect().top;
        debugger;
    });
    
    document.addEventListener("mousemove", function(event){
        if (dragging) {
            let dx = event.clientX-initialX;
            let dy = event.clientY-initialY;
    
            newDiv3.style.left = dx+"px";
            newDiv3.style.top = dy+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
    
}

function card4(groupedDateAndTemp) {
    let i = 3;

    const newDiv4 = document.createElement('div');
    newDiv4.class = "forecastCard";
    newDiv4.id = "weatherContainer04";
    document.body.appendChild(newDiv4);

    const heading5 = document.createElement("h5");
    newDiv4.appendChild(heading5);

    const p02 = document.createElement("p");
    p02.id = "date4";
    p02.textContent = groupedDateAndTemp[i].date;
    heading5.appendChild(p02);

    const p00 = document.createElement("p");
    p00.id = "maxTemp4";
    p00.textContent = `Max: ${maxTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp4";
    p01.textContent = `Min: ${minTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    let dragging = false;
    let initialX = null;
    let initialY = null;

    newDiv4.addEventListener("mousedown", function(event){
        dragging = true;
        initialX = event.clientX-newDiv4.getBoundingClientRect().left;
        initialY = event.clientY-newDiv4.getBoundingClientRect().top;
    });
    
    document.addEventListener("mousemove", function(event){
        if (dragging) {
            let dx = event.clientX-initialX;
            let dy = event.clientY-initialY;
    
            newDiv4.style.left = dx+"px";
            newDiv4.style.top = dy+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
    
}

function card5(groupedDateAndTemp) {
    let i = 4;

    const newDiv5 = document.createElement('div');
    newDiv5.class = "forecastCard";
    newDiv5.id = "weatherContainer05";
    document.body.appendChild(newDiv5);

    const heading5 = document.createElement("h5");
    newDiv5.appendChild(heading5);

    const p02 = document.createElement("p");
    p02.id = "date5";
    p02.textContent = groupedDateAndTemp[i].date;
    heading5.appendChild(p02);

    const p00 = document.createElement("p");
    p00.id = "maxTemp5";
    p00.textContent = `Max: ${maxTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p00);

    const p01 = document.createElement("p");
    p01.id = "minTemp5";
    p01.textContent = `Min: ${minTemp(i,groupedDateAndTemp)} F`;
    heading5.appendChild(p01);

    let dragging = false;
    let initialX = null;
    let initialY = null;

    newDiv5.addEventListener("mousedown", function(event){
        dragging = true;
        initialX = event.clientX-newDiv5.getBoundingClientRect().left;
        initialY = event.clientY-newDiv5.getBoundingClientRect().top;
    });
    
    document.addEventListener("mousemove", function(event){
        if (dragging) {
            let dx = event.clientX-initialX;
            let dy = event.clientY-initialY;
    
            newDiv5.style.left = dx+"px";
            newDiv5.style.top = dy+"px";
        }else{
            return;
        }
    });
    
    document.addEventListener("mouseup", function(event){
        dragging = false;
    });
}
