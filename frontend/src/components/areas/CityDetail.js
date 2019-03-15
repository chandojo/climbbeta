import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CityDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      cityInfo: []
    }
  }

  loadDetails(city){
    let endpoint = `/areas/api/cities/${city}`
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
        console.log('page not found')
      }
      return response.json()
    }).then(function(responseData){
      console.log(responseData);
      thisComp.setState({
          error: null,
          isLoaded: true,
          cityInfo: responseData
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
      city: null,
      cityInfo: []
    })

    if(this.props.match){
      const { city } = this.props.match.params;
      this.setState({
        city: city,
        isLoaded: false
      });
      this.loadDetails(city);
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { error } = this.state;
    const { cityInfo } = this.state;

    return(
      <>
      { !isLoaded ?
        <p>Loading</p> : ""
      }
      { isLoaded && error ? <p>There has been an error...</p> : ""}

      { isLoaded && cityInfo !== null ? <p>It works!</p> : ""}
      </>
    )
  }
}

export default CityDetail;
