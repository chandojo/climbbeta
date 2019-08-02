import 'whatwg-fetch';

export const fetchAPI = (url) => {
    let endpoint = url
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

  return fetch(endpoint,lookupOptions)
    .then((response)=>{
      return response.json()
    }).catch((error)=>error)
  }
