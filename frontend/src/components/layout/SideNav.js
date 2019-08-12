import { BrowserRouter, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { fetchAPI } from '../areas/fetchAPI.js';

class SideNav extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      isLoaded: false,
      stateList: [],
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
    const { error, isLoaded, stateList } = this.state;

    return (
      <div id="sideNav">
      <span className="font-weight-bold">Quick Links</span>
      <ul className="nav flex-column">
        <li className="nav-item random-vid">
          <Link to={{ pathname:`/randomvideo`}}>Take me to a random video</Link>
        </li>
      </ul>
      <span>States</span>
      <ul className="nav flex-column">
      { isLoaded && stateList.length > 0 ? stateList.map((stateItem, index)=>{
        return(
          <li className="nav-item state-link" key={stateItem.id}>
             <Link to={{ pathname:`/${stateItem.id}`}}> {stateItem.name}</Link>
          </li>
          )
      }) : <p>No States Available</p> }
      </ul>
    </div>
    );
  }
}

export default SideNav;
