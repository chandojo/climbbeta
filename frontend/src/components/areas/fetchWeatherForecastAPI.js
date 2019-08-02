import 'whatwg-fetch';

export const fetchWeatherForecastAPI = (cityLat, cityLon) => {
  var weatherKey = process.env.REACT_APP_WEATHER_KEY;
  let endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=${weatherKey}`;

  return fetch(endpoint)
    .then((response)=>{
      if(response.status !== 200){
        console.log('there has been an error fetching the api')
      }
      return response.json()
  })
}
