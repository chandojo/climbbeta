import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import PageError from '../PageError.js';
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
      cityClass: 'card d-inline-flex bg-light state-card',
      status:null
    }
  }

  loadDetails(id){
    let endpoint = `/areas/api/states/${id}/`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
    .then(function(response){
        thisComp.setState({
          status: response.status
        })
        return response.json()
      }).then(function(responseData){
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
      cityClass: 'card d-inline-flex bg-light state-card',
      status:null
    })

    if(this.props.match){
      const { id } = this.props.match.params;
      console.log(this.props.match)
      this.setState({
        id: id,
        isLoaded: false
      });
      this.loadDetails(id);
      }
    }

render(){
      const { isLoaded, id, name, cities, img, error, cityClass, status  } = this.state;
  return(
      <>
      { status == 200 ?
      (<>
          <h1>{ name }</h1>
          { cities.map((city, i)=>{
            return(
            <div className={cityClass} key={i}>
              <Link to={`${this.props.match.url}/${city}`}>
                <div className="card-header text-capitalize">
                  { city }
                </div>
              </Link>
{/*
              <Link to={{ pathname:`/${id}/${city}`}}>
              <div className="card-header text-capitalize">
                { city }
              </div>
              </Link>
*/}
            </div>
            )
          })}
          <Route path={`${this.props.match.path}/:city`} component={CityDetail} />

        </>)
        : <div> <PageError location={location}/> </div>
        }

      </>
      )
    }

}

export default StateDetail;
