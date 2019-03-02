import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import 'whatwg-fetch';
import cookie from 'react-cookies';

class StateDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      id: null,
      cities:[],
    }
  }

  loadCities(id){
    let endpoint = `/areas/api/states/${id}`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(endpoint);
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
        cities: responseData
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
      cities:[],
    })

    if(this.props.match){
      const { id } = this.props.match.params;
      this.setState({
        id: id,
        isLoaded: false
      });
      this.loadCities(id);
    }
  }

  render(){
    const { isLoaded } = this.state;
    const { cities } = this.state;
    const { error } = this.state;
    return(
      <p>it worked!</p>
    )
  }

}

export default StateDetail;
