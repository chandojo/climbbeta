import React, { Component } from 'react';
import {fetchAPI} from '../areas/fetchAPI.js';
import VideoPlayer from './VideoPlayer.js';

export default class RandomVideo extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      video: {},
    };
  }

  loadRandomVideo(){
    let url = `/video/api/videos`
    const thisComp = this

    fetchAPI(url).then(function(responseData){
      const randomPage = Math.floor(Math.random() * responseData.total_pages) + 1;
      let url = `/video/api/videos/?page=${randomPage}`
      return fetchAPI(url)
    })
      .then(function(response){
        const randomVid = Math.floor(Math.random() * 6) + 1;
        const randomVidInfo = response.results[randomVid];
        thisComp.setState({
          isLoaded: true,
          video: randomVidInfo
        })
    }).catch(function(error){
      thisComp.setState({
        isLoaded: true,
        error
      })
    })
  }

  componentDidMount(){
    this.loadRandomVideo()
  }


  render(){
    const { video, error } = this.state;
    return(
      <div className="p-3 mb-1">
        { error | video == undefined ?
          <> <span className="text-danger">There has been an error. Please, refresh your browser.</span></> :
        <>
            <h3 className="text-center text-uppercase">Random Video</h3>
            <div className="embed-responsive embed-responsive-16by9 ">
              <iframe className="embed-responsive-item" src={video.uri} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
            </div>
            <div className="text-center bg-light p-3">
              <h3>{ video.name }</h3>
              <h4>{ video.author }</h4>
              <p> { video.description }</p>
            </div>
          </>
        }

      </div>
    )
  }
}
