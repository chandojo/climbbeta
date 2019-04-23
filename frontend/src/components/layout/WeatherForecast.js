import React, {Component} from 'react';

export default class WeatherForecast extends Component {

    render(){
      const { weatherForecast } = this.props;
      console.log(weatherForecast)
      return(
        <>
        { Object.keys(weatherForecast).map((day, key)=>{
          return(
            <div key={key}>
              { weatherForecast[day].map((value, key)=>{
                return(
                  <div key={key}>
                  { Object.keys(value).map((item, key)=>{
                    return(
                      <p key={key}>{ value[item] }</p>
                    )
                  })}
                </div>

                )
              })}
            </div>

            )
        })}
      </>
      )
    }
  }
