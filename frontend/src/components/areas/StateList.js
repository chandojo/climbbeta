import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import StateInline from './StateInline';

class StateList extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      stateList: [],
      stateClass: 'card d-inline-flex bg-light state-card'
    };
  }

  getStates(){
    let endpoint = `/areas/api/states/`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint,lookupOptions)
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      thisComp.setState({
        isLoaded:true,
        stateList:responseData
      });
    }).catch(function(error){
      console.log("Error: ", error);
      thisComp.setState({
        error,
        isLoaded:true,
      })
    })
  }

  componentDidMount(){
    this.setState({
      error: null,
      isLoaded: false,
      stateList: [],
      stateClass: 'card d-inline-flex bg-light state-card'
  })
    this.getStates()
  }


  render(){
      const { error, isLoaded, stateList, stateClass } = this.state;

      return (
        <div className="card-bank text-center">
          { !isLoaded ? <div data-testid='loadingDiv'>Loading...</div> : "" }

          { isLoaded && stateList.length > 0 ? stateList.map((stateItem, index)=>{
            return(
                <StateInline state={stateItem} stateClass={stateClass}/>
            )
          }) : <p>No States Available</p> }

          { isLoaded && error ? <div data-testid='errorDiv'>An error has occured</div> : "" }
        </div>
    )
  }
}


export default StateList;
