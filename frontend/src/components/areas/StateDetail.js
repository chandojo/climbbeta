import React, {Component, Fragment} from 'react';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import PageError from '../PageError.js';
import CityDetail from './CityDetail.js';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import { fetchAPI } from './fetchAPI';


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
    let url = `/areas/api/states/${id}/`
    const thisComp = this

    fetchAPI(url).then(function(responseData){
      if(responseData.detail){
        thisComp.setState({
          error
        })
      } else {
        thisComp.setState({
          isLoaded: true,
          name: responseData.name,
          cities: responseData.cities,
          img: responseData.img,
          status: responseData.status
        })
      }
    }).catch(function(error){
      thisComp.setState({
        isLoaded: true,
        error
      })
    })
  }

  componentDidMount(){
    if(this.props.match){
      const { id } = this.props.match.params;
      this.setState({
        id: id,
      });
      this.loadDetails(id);
      }
    }

    componentDidUpdate(prevProps){
      const oldProps = prevProps.match.params;
      const newProps = this.props.match.params;
      if(newProps !== oldProps){
          const { id } = newProps;
          this.setState({
            id: id,
            error: null
          });
          this.loadDetails(id);
      }
    }

render(){
      const { isLoaded, id, name, cities, img, error, cityClass, status  } = this.state;
  return(
    <>
    { error ? <div><PageError location={location}/></div> :
      <>
          <h1>{ name }</h1>
          { cities.map((city, i)=>{
            return(
            <div className={cityClass} key={i}>
              <Link to={`${this.props.match.url}/${city}`}>
                <div className="card-header text-capitalize">
                  { city }
                </div>
              </Link>
            </div>
            )
          })}
            <Route path={`${this.props.match.path}/:city`} component={CityDetail} />
        </>  }
      </>
      )
    }

}

export default StateDetail;
