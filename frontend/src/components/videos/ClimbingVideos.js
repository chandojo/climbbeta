import React, {Component} from 'react';
import 'whatwg-fetch';

class ClimbingVideos extends Component {
    constructor(props){
      super(props)
      this.state = {
        error: null,
        isLoaded: false,
        climbingVideos: []
      };
    }

    componentDidMount(){
      let endpoint = '/videos/api/videos'
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
          climbingVideos: responseData
        })
      }).catch(function(error){
        thisComp.setState({
          error,
          isLoaded:true,
        })
          console.log("Error: ", error);
      })
    }

    render(){
          const { error } = this.state;
          const { isLoaded } = this.state;
          const { climbingVideos } = this.state;
          const totalVideos = climbingVideos.length;
          return(
            <div>
            {
              !isLoaded ?
                (<div>Loading...</div>)
               : isLoaded && totalVideos > 0 ?
                (<div> it works! </div>)
              : isLoaded && error !== null ?
                (<div> an error has occured </div>) : ""
            }
            </div>
          )
        }
      }


export default ClimbingVideos;
