import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import StateInline from './StateInline';
import { fetchAPI } from './fetchAPI';

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


getExtractedData(){
  const APIurl = `/areas/api/states/`
  const thisComp = this
  fetchAPI(APIurl).then(function(extractedData){
    thisComp.setState({
      isLoaded:true,
      stateList:extractedData
    })
  }).catch(function(error){
    thisComp.setState({
      error,
      isLoaded:true
    })
  })
}

  componentDidMount(){
    this.getExtractedData();
  }


  render(){
      const { error, isLoaded, stateList, stateClass } = this.state;

      return (
        <>
        <div className="card-bank text-center">
          { !isLoaded ? <div data-testid='loadingDiv'>Loading...</div> : "" }

          { isLoaded && stateList.length > 0 ? stateList.map((stateItem, index)=>{
            return(
                <StateInline state={stateItem} stateClass={stateClass} key={stateItem.id}/>
            )
          }) : <p>No States Available</p> }

          { isLoaded && error ? <div data-testid='errorDiv'>An error has occured</div> : "" }
        </div>

        </>
    )
  }
}


export default StateList;
