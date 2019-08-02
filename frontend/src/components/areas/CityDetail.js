import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Map from '../layout/Map.js';
import PageError from '../PageError.js';
import CityVideosInline from '../videos/CityVideosInline.js';
import VideoPlayer from '../videos/VideoPlayer.js';
import WeatherHeader from '../layout/WeatherHeader.js';
import WeatherForecast from '../layout/WeatherForecast.js';
import AboutCity from '../layout/AboutCity.js';
import { fetchAPI } from './fetchAPI';
import { fetchWeatherAPI, fetchWeatherForecastAPI } from './fetchWeatherAPI';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.previousVideos = this.previousVideos.bind(this)
    this.videoClick = this.videoClick.bind(this)
    this.loadPageVideos = this.loadPageVideos.bind(this)

    this.state = {
      error: null,
      status: null,
      isVideoLoaded: false,
      isWeatherLoaded: false,
      isCityLoaded: false,
      id: null,
      city: null,
      cityInfo: [],
      cityVideos: [],
      thisVideo: null,
      currentPage: null,
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

    if (nextEndpoint !== undefined){
      videoEndpoint = nextEndpoint;
    }

    fetchAPI(videoEndpoint)
    .then((responseData) => {
      thisComp.setState({
        error: null,
        isVideoLoaded:true,
        cityVideos: responseData.results,
        currentPage: responseData.current,
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

  loadCityDetails(city, id){
    let cityEndpoint = `/areas/api/cities/${city}`
    let thisComp = this

    fetchAPI(cityEndpoint)
    .then((responseData) => {
      thisComp.setState({
        status:responseData.status,
        error:null,
        isCityLoaded:true,
        cityInfo: responseData,
        cityLat:responseData.latitude,
        cityLon: responseData.longitude
      });
      return fetchWeatherAPI(this.state.cityLat, this.state.cityLon)
    })
    .then((data) => {
      thisComp.setState({
        weatherToday: data.main,
        weatherDescription: data.weather,
        sunTime: data.sys
      });
      return fetchWeatherForecastAPI(data.coord.lat, data.coord.lon, this.state.cityInfo.timezone)
    })
    .then((dayList)=>{
      thisComp.setState({
        isWeatherLoaded: true,
        weatherForecast: dayList
      })
    })
  .catch(function(error){
      console.log('error',error);
      thisComp.setState({
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
  if(this.props.match){
    const { city } = this.props.match.params;
    const { id } = this.props.match.params;
    this.setState({
      id: id,
      city: city
    });
    this.loadCityDetails(city, id);
    this.loadVideos(city);
    }
  }

componentDidUpdate(prevProps){
  const oldProps = prevProps.match.params
  const newProps = this.props.match.params
  if(newProps !== oldProps){
    const { city } = newProps;
    const { id } = newProps;
    this.setState({
      id: id,
      city: city,
    });
    this.loadCityDetails(city, id);
    this.loadVideos(city);

  }
}

  render() {
    const { isVideoLoaded, isCityLoaded, isWeatherLoaded, error, status, cityInfo, cityVideos, thisVideo, currentPage, next, previous, totalPages, pagesArray, weatherToday, weatherDescription, weatherForecast, sunTime, videoClick } = this.state;
    return(
      <>
      { error ? <div> <PageError location={location}/> </div> :
      (  <>{ isWeatherLoaded === true ?
          <div className="shadow bg-light mt-2">
            <h1 className="text-center p-2">{cityInfo.name}, {cityInfo.state_name}</h1>
            <WeatherHeader weatherToday={weatherToday} weatherDescription={weatherDescription} sunTime={sunTime} />
          </div> : "" }
          { !isCityLoaded ?
            <p>Loading</p> : ""
          }
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
                      { previous !== null ? <li className="page-item"><button type="button" className="btn btn-outline-success m-1" onClick={this.previousVideos}>Previous</button></li> : "" }
                      { pagesArray.length > 0 ?
                        <>
                         { pagesArray.map((link,index)=>{
                           const pageNum = index + 1;
                           return(
                             <li className="page-item" key={index}>
                               { currentPage === pageNum ?
                                 <button type="button" className="btn btn-success m-1" onClick={this.loadPageVideos.bind(this,link)}> { pageNum } </button>
                                 : <button type="button" className="btn btn-outline-success m-1" onClick={this.loadPageVideos.bind(this,link)}> { pageNum } </button>
                                }
                             </li>
                           )
                        }) }
                      </>
                        : ""}
                      { next !== null ? <li className="page-item"><button type="button" className="btn btn-outline-success m-1" onClick={this.loadMoreVideos}>Next</button></li> : ""}
                    </ul>
              </nav>
              { isVideoLoaded && cityVideos !== null ?
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
            <div className="tab-pane fade" id="nav-map" role="tabpanel" aria-labelledby="nav-map-tab">
              <Map city={cityInfo.name} state={cityInfo.state_name} />
            </div>
            <div className="tab-pane fade" id="nav-about-area" role="tabpanel" aria-labelledby="nav-about-area-tab">
              <AboutCity cityInfo={cityInfo}/>
            </div>
          </div>
        </div>
      </>
)}
    </>
    )
  }
}

export default CityDetail;
