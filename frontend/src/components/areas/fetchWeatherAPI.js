import 'whatwg-fetch';

export const fetchWeatherAPI = (cityLat, cityLon) => {
    var weatherKey = process.env.REACT_APP_WEATHER_KEY;
    let endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=${weatherKey}`;

  return fetch(endpoint)
    .then((response)=>{
      if(response.status !== 200){
        console.log('there has been an error fetching the api')
        }
        return response.json()
      })
    }

    export const fetchWeatherForecastAPI = (cityLat, cityLon, timezone) => {
      var weatherKey = process.env.REACT_APP_WEATHER_KEY;
      let endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=${weatherKey}`;

      return fetch(endpoint)
        .then((response)=>{
          if(response.status !== 200){
            console.log('there has been an error fetching the api')
          }
          return response.json()
      }).then((responseData)=>{
              var forecastData = [];
              for (var i=0; i < responseData.list.length; i++){
                const dayWeather = {
                  "dt": new Date(responseData.list[i].dt * 1000).toLocaleString('en-US', { timeZone: timezone }),
                  "temp": responseData.list[i].main.temp,
                  "desc": responseData.list[i].weather[0].description,
                  "icon": responseData.list[i].weather[0].icon
                };
                forecastData.push(dayWeather)
              }
              return forecastData
            })
            .then((forecastData)=>{
                    var dayList = {};
                    for (var i=0; i < forecastData.length; i++){
                      var idt = forecastData[i].dt;
                      var dayKey = idt.slice(0,9);
                      if(!(dayKey in dayList)){
                        dayList[dayKey] = []
                        }
                      dayList[dayKey].push(forecastData[i])
                    };
                      return dayList
                    })
    }
