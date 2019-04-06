import React, { Component } from 'react';

class VideoPlayer extends Component{
  render(){
    const { video } = this.props;

    return(
      <>
      { video !== null ?
        <div className="row">
          <div className="col-md embed-responsive embed-responsive-4by3 ">
            <iframe className="embed-responsive-item" src={video.uri}></iframe>
          </div>
          <div className="col-md align-middle">
            <div className="p-3 align-middle align-content-center text-center">
              <h3>{ video.name } <small>{ video.author }</small></h3>
              <p> { video.description }</p>
            </div>
          </div>
        <div className="embed-responsive embed-responsive-21by9">
          <iframe className="embed-responsive-item" src={video.uri}></iframe>
        </div>
        : ""
      }
      </>
    )
  }
}

export default VideoPlayer;
