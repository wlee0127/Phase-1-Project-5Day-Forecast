
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
        let icon01 = data.list[0].weather[0].icon;
        let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";
        let date01 = data.list[0].dt_txt;
        let date01String = date01.substr(0,10);

        document.getElementById("citylocation").textContent = `${data.city.name},`;
        document.getElementById("country").textContent = data.city.country;
        document.getElementById("current01").src= current01src;
        document.getElementById("current01description").textContent = data.list[0].weather[0].description;
        document.getElementById("date").textContent = date01String;
     })
     .catch((error) => console.log(error))

    /*let result = (api_weather+location+"&appid="+api_key);
    let response = await fetch(result);
    var data = await response.json();
    debugger;
    let icon01 = data.list[0].weather[0].icon;
    let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";
    let date01 = data.list[0].dt_txt;
    let date01String = date01.substr(0,10);

    document.getElementById("citylocation").textContent = `${data.city.name},`;
    document.getElementById("country").textContent = data.city.country;
    document.getElementById("current01").src= current01src;
    document.getElementById("current01description").textContent = data.list[0].weather[0].description;
    document.getElementById("maxTemp").textContent = //Average maxTemp of the day;
    document.getElementById("minTemp").textContent = //averate mintemp of the day;
    document.getElementById("date").textContent = date01String;
    */
/*
    
        //divElement01.classList.toggle('background');
        document.getElementById("citylocation").innerHTML = data.name;
        document.getElementById("country").innerHTML = ", "+data.sys.country;
        document.getElementById("currenttemp").innerHTML = "Outside: "+((((data.main.temp)-273.15)*(9/5)+32).toFixed(0))+" \xB0F";
        document.getElementById("date").innerHTML=dateResult;
        document.getElementById("time").innerHTML=localeTime;
        document.getElementById("current01").src= current01src;
        document.getElementById("current01description").innerHTML = data.weather[0]?.description;
      
        let future = (api_forecast+location+"&appid="+api_key);
        let response01 = await fetch(future);
        var data01 = await response01.json();
        
        let date01Result = new Date((data01.list[8].dt)*1000).toLocaleDateString("en-US");
        let date02Result = new Date((data01.list[15].dt)*1000).toLocaleDateString("en-US");
        let date03Result = new Date((data01.list[22].dt)*1000).toLocaleDateString("en-US");
        let date04Result = new Date((data01.list[29].dt)*1000).toLocaleDateString("en-US");
        document.getElementById("date01").innerHTML = date01Result;
        document.getElementById("date02").innerHTML = date02Result;
        document.getElementById("date03").innerHTML = date03Result;
        document.getElementById("date04").innerHTML = date04Result;

        maxtempArray=[];*/
    }

document.addEventListener('keydown',function(event){
    const pressedKey=event.key;
    if (pressedKey==='Enter'){
        weatherData();
    }
});