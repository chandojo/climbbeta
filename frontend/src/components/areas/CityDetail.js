import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CityVideosInline from '../videos/CityVideosInline.js';
import VideoPlayer from '../videos/VideoPlayer.js';
import WeatherHeader from '../layout/WeatherHeader.js';
import WeatherForecast from '../layout/WeatherForecast.js';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.previousVideos = this.previousVideos.bind(this)
    this.videoClick = this.videoClick.bind(this)
    this.loadPageVideos = this.loadPageVideos.bind(this)

    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: [],
      cityVideos: [],
      thisVideo: null,
      next: null,
      previous: null,
      count: 0,
      totalPages: 0,
      pagesArray: [],
      cityLat: 0,
      cityLon: 0,
      weatherToday: [],
      weatherDescription:[],
      sunTime:[],
      weatherForecast:[]
    }
  }

  loadMoreVideos(){
    const {city} = this.state;
    const {next} = this.state;
    if (next !== null || next !== undefined){
      this.loadVideos(city, next);
    };
  }

  previousVideos(){
    const {city} = this.state;
    const {previous} = this.state;
    if (previous !== null || previous !== undefined){
      this.loadVideos(city, previous);
    };
  }

  loadPageVideos(clickedPage){
    const {city} = this.state;
    this.loadVideos(city, clickedPage);
  }

  loadVideos(city, nextEndpoint){
    let videoEndpoint = `/video/api/videos/?city=${city}`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (nextEndpoint !== undefined){
      videoEndpoint = nextEndpoint;
    }

    fetch(videoEndpoint, lookupOptions).then(function(response){
      if(response.status !== 200){
        console.log("there is an error for city video")
      }
      return response.json()
    })
    .then((responseData) => {
      thisComp.setState({
        error:null,
        isLoaded:true,
        cityVideos: responseData.results,
        next: responseData.next,
        previous: responseData.previous,
        count: responseData.count,
        totalPages: responseData.total_pages
      })
      var pageTotal = responseData.total_pages
      return pageTotal
    })
    .then((pageTotal)=>{
      var pages = []
      if(pageTotal > 1){
        for(var i=0; i < pageTotal; i++){
          var pageNum = i+1
          var pageEndpoint = `/video/api/videos/?city=${city}&page=${pageNum}`
          pages.push(pageEndpoint)
        }
      };
      return pages
    })
    .then((pages)=>{
      thisComp.setState({
        pagesArray: pages
      })
    })
  .catch(function(error){
      console.log('error',error);
      thisComp.setState({
        isLoaded: true,
        error
      })
    })
  }

    loadCityDetails(city){
      let cityEndpoint = `/areas/api/cities/${city}`
      let thisComp = this
      let lookupOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(cityEndpoint, lookupOptions).then(function(response){
        if(response.status == 404){
          console.log("there is a 404 error for city info")
        }
        return response.json()
      })
      .then((responseData) => {
        thisComp.setState({
          error:null,
          isLoaded:true,
          cityInfo: responseData,
          cityLat:responseData.latitude,
          cityLon: responseData.longitude
        });
        var cityLat = responseData.latitude;
        var cityLon = responseData.longitude;
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5`);
      })
      .then(function(response) {
          return response.json();
        })
      .then((data) => {
        thisComp.setState({
          weatherToday: data.main,
          weatherDescription: data.weather,
          sunTime: data.sys
        });
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5`)
      })
      .then((response)=>{
        return response.json();
      })
      .then((responseData)=>{
        var forecastData = [];
        var cityInfo = this.state;
        for (var i=0; i < responseData.list.length; i++){
          const dayWeather = {
            "dt": new Date(responseData.list[i].dt * 1000).toLocaleString('en-US', { timeZone: cityInfo.timezone }),
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
          var dayKey = idt.slice(0,8);
          if(!(dayKey in dayList)){
            dayList[dayKey] = []
            }
          dayList[dayKey].push(forecastData[i])
        };
          return dayList
        })
      .then((dayList)=>{
        thisComp.setState({
          weatherForecast: dayList
        })
      })
    .catch(function(error){
        console.log('error',error);
        thisComp.setState({
          isLoaded: true,
          error
        })
      })
    }

  videoClick(video){
    this.setState({
      thisVideo: video
    });
  }

  componentDidMount(){
    this.setState({
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: [],
      cityVideos: [],
      next: null,
      previous: null,
      count: 0,
      totalPages: 0,
      pagesArray: [],
      cityLat: 0,
      cityLon: 0,
      weatherToday: [],
      weatherDescription:[],
      suntime:[],
      weatherForecast:[]
    })

    if(this.props.match){
      const { city } = this.props.match.params;
      this.setState({
        city: city,
        isLoaded: false
      });
      this.loadVideos(city);
      this.loadCityDetails(city);
    };
  }

  render() {
    const { isLoaded, error, cityInfo, cityVideos, thisVideo, next, previous, totalPages, pagesArray, weatherToday, weatherDescription, weatherForecast, sunTime, videoClick } = this.state;
    return(
      <>
      <div className="shadow bg-light mt-2">

        <h1 className="text-center p-2">{cityInfo.name}, {cityInfo.state}</h1>
        <WeatherHeader weatherToday={weatherToday} weatherDescription={weatherDescription} sunTime={sunTime} />
      </div>
      { !isLoaded ?
        <p>Loading</p> : ""
      }
      { isLoaded && error ? <p>There has been an error...</p> : ""}
      <div className="video-player col">
        <VideoPlayer video={thisVideo}/>
      </div>
      <div className="pt-3">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-videos-tab" data-toggle="tab" href="#nav-videos" role="tab" aria-controls="nav-videos" aria-selected="true">Videos</a>
          <a className="nav-item nav-link" id="nav-weather-forecast-tab" data-toggle="tab" href="#nav-weather-forecast" role="tab" aria-controls="nav-weather-forecast" aria-selected="false">Weather Forecast</a>
          <a className="nav-item nav-link" id="nav-map-tab" data-toggle="tab" href="#nav-map" role="tab" aria-controls="nav-map" aria-selected="false">Map</a>
          <a className="nav-item nav-link" id="nav-about-area-tab" data-toggle="tab" href="#nav-about-area" role="tab" aria-controls="nav-about-area" aria-selected="false">About Area</a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">
          <nav aria-label="Page navigation" className="pr-3" >
                <ul className="pagination justify-content-end pt-3 pr-3">
                  { previous !== null ? <li className="page-item"><button type="button" className="btn btn-success m-1" onClick={this.previousVideos}>Previous</button></li> : "" }
                  { pagesArray.length > 0 ?
                    <>
                     { pagesArray.map((link,index)=>{
                       return(
                         <li className="page-item">
                           <button type="button" className="btn btn-success m-1" onClick={this.loadPageVideos.bind(this,link)}> { index + 1 } </button>
                         </li>
                       )
                    }) }
                  </>
                    : ""}
                  { next !== null ? <li className="page-item"><button type="button" className="btn btn-success m-1" onClick={this.loadMoreVideos}>Next</button></li> : ""}
                </ul>
          </nav>
          { isLoaded && cityVideos !== null && error === null ?
                <div className="card-deck m-0 p-3">
                  { cityVideos.map((video)=>{
                    return (
                        <CityVideosInline video={video} key={video.name} onClick={this.videoClick.bind(this, video)}/>
                    );
                  })}
                </div>
              : ""}

        </div>
        <div className="tab-pane fade" id="nav-weather-forecast" role="tabpanel" aria-labelledby="nav-weather-forecast-tab">
          <WeatherForecast weatherForecast={weatherForecast} />
        </div>
        <div className="tab-pane fade" id="nav-map" role="tabpanel" aria-labelledby="nav-map-tab">Map</div>
        <div className="tab-pane fade" id="nav-about-area" role="tabpanel" aria-labelledby="nav-about-area-tab">About Area</div>
      </div>
    </div>


    </>
    )
  }
}

export default CityDetail;
