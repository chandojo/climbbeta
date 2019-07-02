export function loadDetails(id){
    let endpoint = `/areas/api/states/${id}/`
    let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
    .then(function(response){
        thisComp.setState({
          status: response.status
        })
        return response.json()
      }).then(function(responseData){
      thisComp.setState({
        isLoaded: true,
        name: responseData.name,
        cities: responseData.cities,
        img: responseData.img
      })
    }).catch(function(error){
      console.log('error',error);
      thisComp.setState({
        isLoaded: true,
        error
      })
    })
  }
