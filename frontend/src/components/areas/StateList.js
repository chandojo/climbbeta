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
      console.log(responseData);
      thisComp.setState({
        isLoaded:true,
        stateList:responseData
      });
    }).catch(function(error){
      thisComp.setState({
        error,
        isLoaded:true,
      })
        console.log("Error: ", error);
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
          { !isLoaded ? <div>Loading...</div> : "" }

          { isLoaded && stateList.length > 0 ? stateList.map((stateItem, index)=>{
            return(
                <StateInline state={stateItem} stateClass={stateClass}/>
            )
          }) : <p>No States Available</p> }

          { isLoaded && error ? <div>An error has occured</div> : "" }
        </div>
    )
  }
}


export default StateList;
