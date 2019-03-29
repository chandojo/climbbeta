import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CityVideosInline from '../videos/CityVideosInline.js';
import VideoContainer from '../videos/VideoContainer.js';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.loadMoreVideos = this.loadMoreVideos.bind(this)

    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: [],
      cityVideos: [],
      next: null,
      previous: null,
      count: 0
    }
  }

  loadMoreVideos(){
    const {next} = this.state
    if (next !== null || next !== undefined){
      this.loadDetails(next)
    }
  }



  loadDetails(city){
    let cityEndpoint = `/areas/api/cities/${city}`
    let videoEndpoint = `/video/api/videos/?city=${city}`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    var cityInfoRequest = fetch(cityEndpoint, lookupOptions).then(function(response){
      if(response.status == 404){
        console.log("there is a 404 error for city info")
      }
      return response.json()
    });
    var cityVideosRequest = fetch(videoEndpoint, lookupOptions).then(function(response){
      if(response.status !== 200){
        console.log("there is an error for city video")
      }
      return response.json()
    });
    var combinedData = {"cityInfoRequest":{}, "cityVideosRequest":{}};

    Promise.all([ cityInfoRequest, cityVideosRequest])
    .then(function(values){
      combinedData["cityInfoRequest"] = values[0];
      combinedData["cityVideosRequest"] = values[1];
      return combinedData;
    })
    .then((combinedData) => {
      console.log(combinedData);
      thisComp.setState({
        error:null,
        isLoaded:true,
        cityInfo: combinedData["cityInfoRequest"],
        cityVideos: combinedData["cityVideosRequest"].results,
        next: combinedData["cityVideosRequest"].next,
        previous: combinedData["cityVideosRequest"].previous,
        count: combinedData["cityVideosRequest"].count,

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
      count: 0
    })

    if(this.props.match){
      const { city } = this.props.match.params;
      this.setState({
        city: city,
        isLoaded: false
      });
      this.loadDetails(city);
    };
  }

  render() {
    const { isLoaded } = this.state;
    const { error } = this.state;
    const { cityInfo } = this.state;
    const { cityVideos } = this.state;
    const { next } = this.state

    return(
      <>
      { !isLoaded ?
        <p>Loading</p> : ""
      }
      { isLoaded && error ? <p>There has been an error...</p> : ""}

      { isLoaded && cityInfo !== null && cityVideos !== null && error === null ?
//        <VideoContainer cityInfo={ cityInfo } cityVideos={ cityVideos } next={next}/>
          <div className="city-details">
            <div className="video-player">
            </div>

            <h1 className="text-center">{cityInfo.name} Climbing Videos</h1>
            <div className="card-deck border">
              { cityVideos.map((video)=>{
                return (
                  <CityVideosInline video={video}/>
                )
              })}
            </div>
          </div>

          : ""}
          { next !== null ? <button onClick={this.loadMoreVideos}>Load more</button> : ""}

    </>
    )
  }
}

export default CityDetail;
