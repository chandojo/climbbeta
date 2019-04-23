import React, { Component } from 'react';

export default class WeatherHeader extends Component {
  render(){
    const { weatherToday } = this.props;
    const { weatherDescription } = this.props;
    const { sunTime } = this.props;

    return(
      <div className="row m-0 justify-content-center fixed">
            { weatherDescription.map((item, key)=>{
              const icon = `http://openweathermap.org/img/w/${item.icon}.png`;
              return(
                <div key={key}>
                <div className="d-inline-block"><img src={icon} alt={item.main}/></div>
                <div className="d-inline-block pl-2 pr-2">
                  <p className="text-capitalize mt-3">{item.description}</p>
                </div>
              </div>
                )
              })}
              <div className="d-inline pl-2 pr-2">
                <p className="mt-3">{ weatherToday.temp } &#176;F</p>
              </div>
              <div className="d-inline pl-2 pr-2">
                <p className="mt-3"><b>Max:</b> { weatherToday.temp_max } &#176;F</p>
              </div>
              <div className="d-inline pl-2 pr-2">
                <p className="mt-3"><b>Min:</b> { weatherToday.temp_min } &#176;F</p>
              </div>
              <div className="d-inline pl-2 pr-2">
                <p className="mt-3"><b>Min:</b> { weatherToday.temp_min } &#176;F</p>
              </div>
              <div className="d-inline pl-2 pr-2">
                <p className="mt-3"><b>Humidity:</b> { weatherToday.humidity }%</p>
              </div>
      </div>
    )
  }
}
