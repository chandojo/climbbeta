import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CityVideosInline from '../videos/CityVideosInline.js';
import VideoContainer from '../videos/VideoContainer.js';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)
    this.previousVideos = this.previousVideos.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: [],
      cityVideos: [],
      next: null,
      previous: null,
      count: 0,
      totalPages: 0

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
          cityInfo: responseData
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
      totalPages: 0
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
    const { isLoaded, error, cityInfo, cityVideos, next, previous, totalPages } = this.state;

    return(
      <>
      { !isLoaded ?
        <p>Loading</p> : ""
      }
      { isLoaded && error ? <p>There has been an error...</p> : ""}

      { isLoaded && cityVideos !== null && error === null ?
          <div className="city-details">
            <div className="video-player">
            </div>

            <h1 className="text-center">{cityInfo.name} Climbing Videos</h1>
            <div className="card-deck border">
              { cityVideos.map((video)=>{
                return (
                  <CityVideosInline video={video}/>
                );
              })}
            </div>
          </div>
          : ""}
          { previous !== null ? <button onClick={this.previousVideos}>Previous</button> : ""}
          { next !== null ? <button onClick={this.loadMoreVideos}>Next</button> : ""}

    </>
    )
  }
}

export default CityDetail;
