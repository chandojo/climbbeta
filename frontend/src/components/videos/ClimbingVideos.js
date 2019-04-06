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
      let endpoint = `/video/api/videos`
      let thisComp = this
      let lookupOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(endpoint,lookupOptions)
      .then(function(response){
      if(response.status == 404){
        console.log('there has been an error')
      }
        return response.json()
      }).then(function(responseData){
        console.log(responseData);
        thisComp.setState({
          isLoaded:true,
          climbingVideos: responseData
        });
      }).catch(function(error){
        thisComp.setState({
          error,
          isLoaded:true,
        })
          console.log("Error: ", error);
      })
    }

    render(){
          const { error, isLoaded, climbingVideos } = this.state;
          const totalVideos = climbingVideos.length;
          
          return(
            <div>
            {
              !isLoaded ?
                (<div>Loading...</div>)
               : isLoaded && totalVideos > 0 && totalVideos !== null ?
                (<div> It works! { climbingVideos[0].name } </div>)
              : isLoaded && error !== null | totalVideos == null ?
                (<div> an error has occured </div>) : ""
            }
            </div>
          )
        }
      }


export default ClimbingVideos;
