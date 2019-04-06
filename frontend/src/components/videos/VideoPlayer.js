import React, { Component } from 'react';

class VideoPlayer extends Component{
  render(){
    const { video } = this.props;

    return(
      <>
      { video !== null ?
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
