import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CityVideosInline from '../videos/CityVideosInline.js';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: [],
      cityVideos: []
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
        cityVideos: combinedData["cityVideosRequest"]
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
      cityVideos: []
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

    return(
      <>
      { !isLoaded ?
        <p>Loading</p> : ""
      }
      { isLoaded && error ? <p>There has been an error...</p> : ""}

      { isLoaded && cityInfo !== null && cityVideos !== null && error === null ?
        <div>
          <p>It works! { cityInfo.name }</p>
          <div className="video-player">
          </div>
          { cityVideos.map((video, id)=>{
            return(
                <div className={id} key={id}>
                  <CityVideosInline video={video}/>
                </div>
            )
          })}
        </div>

        : ""}

      </>
    )
  }
}

export default CityDetail;
