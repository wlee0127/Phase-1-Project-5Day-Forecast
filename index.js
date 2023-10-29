
async function weatherData(){
    const api_weather = "https://api.openweathermap.org/data/2.5/weather?q=";
    const api_time = "http://api.timezonedb.com/v2.1/get-time-zone?key=";     
    const api_key = "640535654e67f478602e4d33c98a6724";
    const api_timeKey = "QYAPGI40DCWQ";
    const divElement01 = document.querySelector('.container01');
    
        let location = document.getElementById("inputlocation").value;
        divElement01.classList.toggle('background');

        //api call #1 -- for current weather condition
        let result = (api_weather+location+"&appid="+api_key);
        let response = await fetch(result);
        var data = await response.json();
        let icon01 = data.weather[0]?.icon;
        let lat = data.coord.lat;
        let lng = data.coord.lon;
        let current01src="https://openweathermap.org/img/wn/"+icon01+"@2x.png";
        let dateResult = new Date(data.dt*1000).toLocaleDateString();

        // api call #2 -- for current time.  Time will be formatted to locale en-us time
        let timeResult = (api_time+api_timeKey+"&format=json&by=position&lat="+lat+"&lng="+lng);
        let timeResponse = await fetch(timeResult);
        var timeData = await timeResponse.json();
        let formattedTime = timeData.formatted;
        let localeTime = new Date(formattedTime).toLocaleTimeString("en-US",{hour: "numeric", minute: "numeric", hour12: true});
     
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

        maxtempArray=[];
    }

document.addEventListener('keydown',function(event){
    const pressedKey=event.key;
    if (pressedKey==='Enter'){
        weatherData();
    }
});