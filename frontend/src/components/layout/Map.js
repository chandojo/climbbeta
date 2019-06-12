import React, { Component } from 'react';

export default class Map extends Component {
  render(){
    const { city, state } = this.props;
    var googleEmbedKey = process.env.REACT_APP_GOOGLE_EMBED_KEY;
    var link = `https://www.google.com/maps/embed/v1/place?q=${city},+${state}&key=${googleEmbedKey}`;

    return(
      <div className="row p-2">
        <div className="col-md embed-responsive embed-responsive-16by9 ">
          <iframe className="embed-responsive-item" src={link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" frameBorder="0" allowFullScreen onload="this.style.height=this.contentDocument.body.scrollHeight +'px';"></iframe>
        </div>
    </div>
    )
  }
}
