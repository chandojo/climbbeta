import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import CityDetail from './CityDetail.js';
import 'whatwg-fetch';
import cookie from 'react-cookies';

class StateDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      id: null,
      name: null,
      cities: [],
      img: null,
      cityClass: 'card d-inline-flex bg-light state-card'
    }
  }

  loadDetails(id){
    let endpoint = `/areas/api/states/${id}`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
    .then(function(response){
      if(response.status == 404){
        console.log('Page not found')
      }
      return response.json()
    }).then(function(responseData){
      console.log(responseData);
      thisComp.setState({
        isLoaded: true,
        name: responseData.name,
        cities: responseData.cities,
        img: responseData.img
      })
    }).catch(function(error){
      console.log('error',error);
      thisComp.setState({
        isLoaded: true,
        error
      })
    })
  }

  componentDidMount(){
    this.setState({
      error: null,
      isLoaded: false,
      id: null,
      name: null,
      cities: [],
      img: null,
      cityClass: 'card d-inline-flex bg-light state-card'
    })

    if(this.props.match){
      const { id } = this.props.match.params;
      this.setState({
        id: id,
        isLoaded: false
      });
      this.loadDetails(id);
    }
 }
render(){
      const { isLoaded, name, cities, img, error, cityClass  } = this.state;

  return(
      <>
      <h1>{ name }</h1>
      { cities.map((city, i)=>{
        return(
        <div className={cityClass} key={i}>
          <div className="card-header text-capitalize">
            { city }
          </div>
        </div>

        )
      })}
      </>
    )
  }

}

export default StateDetail;
