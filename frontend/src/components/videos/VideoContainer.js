import React, {Component} from 'react';
import CityVideosInline from './CityVideosInline.js';

class VideoContainer extends Component {
    render(){
      const { cityInfo } = this.props;
      const { cityVideos } = this.props;
      const { next } = this.props;

      return(
        <div className="city-details">
          <div className="video-player">
          </div>

          <h1 className="text-center">{cityInfo.name} Climbing Videos</h1>
          <div className="card-deck border">
            { cityVideos.map((video)=>{
              return(
                <CityVideosInline video={video}/>
              )
            })}
          </div>
        </div>
      )
    }
  }


export default VideoContainer;
