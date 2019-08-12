import React, {Component} from 'react';
import 'whatwg-fetch';
import { fetchAPI } from '../areas/fetchAPI.js';

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

      fetchAPI(endpoint)
      .then(function(responseData){
        thisComp.setState({
          isLoaded:true,
          climbingVideos: responseData.results
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
          console.log(climbingVideos)

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
