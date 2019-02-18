import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';

class StateDetails extends Component {
//    loadStateDetails(){
//      let endpoint='/areas/api/states'
//
//      let lookupOptions = {
//          method: "GET",
//          headers: {
//            'Content-Type': 'application/json'
//      }
//
//      fetch(endpoint, lookupOptions)
//        .then(function(response){
//          return response.json()
//        }).then(function)
//    }


    render(){
        return (
          <h2>These are my state details!</h2>
        );
    }
}


export default StateDetails;
