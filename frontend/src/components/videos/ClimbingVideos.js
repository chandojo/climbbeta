import React, {Component} from 'react';
import 'whatwg-fetch';

class ClimbingVideos extends Component {
    constructor(props){
      super(props)
      this.state = {
        isLoaded: false,
        climbingVideos: []
      };
    }

    componentDidMount(){
      let endpoint = '/videos/api/videos/'
      let thisComp = this
      let lookupOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){
        return response.json()
      }).then(function(responseData){
          console.log(responseData);
          thisComp.setState({
            isLoaded: true,
            climbingVideos:responseData
          })
      });
    }

    render(){
          const { isLoaded } = this.state;
          const { climbingVideos } = this.state;
          const totalVideos = climbingVideos.length;
          return(
            <div>
              { !isLoaded ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <p>It works! </p>
                  { climbingVideos[0].name }
                 </div>
              )}
            </div>
          )
        }
      }


export default ClimbingVideos;
