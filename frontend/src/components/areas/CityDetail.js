import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CityVideosInline from '../videos/CityVideosInline.js';
import VideoPlayer from '../videos/VideoPlayer.js';
import WeatherHeader from '../layout/WeatherHeader.js';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.previousVideos = this.previousVideos.bind(this)
    this.videoClick = this.videoClick.bind(this)

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
      weatherToday: [],
      weatherDescription:[],
      sunTime:[]
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
      });
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
        });
        var cityLat = responseData.latitude;
        var cityLon = responseData.longitude;
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&APPID=5f14a9e6503b7e9ccad869971588e4c5`);
      })
      .then(function(response) {
          return response.json();
        })
      .then((data) => {
        console.log(data)
        thisComp.setState({
          weatherToday: data.main,
          weatherDescription: data.weather,
          sunTime: data.sys
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

// !!!!!!!!!!!!!!!!!!!WORK ON THIS!!!!!!!!!!!!!!!!
//  pageNumbered(totalPages, city){
//    let pageEndpoint = `/areas/api/cities/${city}&page=${i}`
//    let pages = {}
//    if(totalPages > 1){
//      for(i=0; i < totalPages; i++){
//          pages.update({i: pageEndpoint})
//      }
//    }
//    this.setState({
//      pagesArray: pages
//    });
//    console.log(pages);
//  }

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
      weatherToday: [],
      weatherDescription:[],
      suntime:[]
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
    const { isLoaded, error, cityInfo, cityVideos, thisVideo, next, previous, totalPages, pagesArray, weatherToday, weatherDescription, sunTime, videoClick } = this.state;

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
          <a className="nav-item nav-link" id="nav-amenities-tab" data-toggle="tab" href="#nav-amenities" role="tab" aria-controls="nav-amenities" aria-selected="false">Amenities</a>

        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">
          { isLoaded && cityVideos !== null && error === null ?
                <div className="card-deck m-0 p-3">
                  { cityVideos.map((video)=>{
                    return (
                        <CityVideosInline video={video} key={video.name} onClick={this.videoClick.bind(this, video)}/>
                    );
                  })}
                </div>
              : ""}
              { previous !== null ? <button type="button" class="btn btn-info m-1" onClick={this.previousVideos}>Previous</button> : ""}
              { next !== null ? <button type="button" class="btn btn-info m-1" onClick={this.loadMoreVideos}>Next</button> : ""}
        </div>
        <div className="tab-pane fade" id="nav-weather-forecast" role="tabpanel" aria-labelledby="nav-weather-forecast-tab">Weather Forecast</div>
        <div className="tab-pane fade" id="nav-map" role="tabpanel" aria-labelledby="nav-map-tab">Map</div>
        <div className="tab-pane fade" id="nav-about-area" role="tabpanel" aria-labelledby="nav-about-area-tab">About Area</div>
        <div className="tab-pane fade" id="nav-amenities" role="tabpanel" aria-labelledby="nav-amenities-tab">Amenities</div>

      </div>
    </div>


    </>
    )
  }
}

export default CityDetail;
