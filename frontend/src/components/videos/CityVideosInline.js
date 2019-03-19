import React, {Component} from 'react';
import 'whatwg-fetch';
import '../design/videoCard.css';


class CityVideosInline extends Component {
    render(){
      const { video } = this.props;
      return(
        <div>
          <div className="video-card pointer p-3 border-light d-block">
            <div className="img">
              <img className="mx-auto video-image" src={ video.thumbnail } />
            </div>
            <div className="p-1">
              <span><strong>{ video.name }</strong></span>
              <span className="video-author"> by { video.author }</span>
            </div>
          </div>
        </div>
      )
    }
  }


export default CityVideosInline;
