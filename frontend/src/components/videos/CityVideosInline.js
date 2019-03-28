import React, {Component} from 'react';
import 'whatwg-fetch';
import '../design/videoCard.css';


class CityVideosInline extends Component {

    render(){
      const { video } = this.props;

      return(
          <div className="video-card mx-auto pointer p-1 border-light">
            <div className="img">
              <img className="mx-auto video-image" src={ video.thumbnail } />
            </div>
            <div className="p-1 text-center">
              <span className="d-block"><strong>{ video.name }</strong></span>
              <span className="video-author"> by { video.author }</span>
            </div>
          </div>
      )
    }
  }


export default CityVideosInline;
