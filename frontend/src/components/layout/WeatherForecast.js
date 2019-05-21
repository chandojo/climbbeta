import React, {Component} from 'react';

export default class WeatherForecast extends Component {

    render(){
      const { weatherForecast } = this.props;
      return(
        <div className="row">
        { Object.keys(weatherForecast).map((day, key)=>{
          return(
              <div className="col text-center border border-light" key={key}>
                  <h5 className="mt-1 pt-3 pb-3 bg-warning">{ day }</h5>

                { weatherForecast[day].map((value, key)=>{
                  var icon = `https://openweathermap.org/img/w/${ value.icon }.png`;
                      return(
                        <div className="card mx-auto text-center border-0" key={key}>
                          <div className="card-header">{ value.dt.slice(10) }</div>
                          <img className=" mx-auto d-block" src={ icon }/>
                          <div className="card-text">
                            <p className="text-capitalize">{ value.temp}&#176;F { value.desc }</p>
                          </div>
                        </div>
                      )
                    })}
            </div>
            )
        })}
      </div>
      )
    }
  }
