export function fetchLogin(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
      },
      body: JSON.stringify( { username } ),
    })
    // fetch() rejects on network error
    // So we convert that to a formatted error object
    // so our caller can handle all "errors" in a similar way
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  // response.ok checks the status code from the service
        // This service returns JSON on errors,
        // so we use that as the error object and reject
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); // happy status code means resolve with data from service
    });
  }
  
  export function fetchGet() {
      // Return a promise of parsed results or error object
      return fetch(`/api/session/`) // Using a relative url so we use the existing current page domain + protocol
        .catch( () => { // network error is rejected promise
          return Promise.reject({ error: 'networkError' }); // We return rejected promise with an error object!
        })
        .then( response => {
          if(!response.ok) { // Some sort of error status code
            return response.json().then( info => Promise.reject(info) ); // We return rejected promise with parsed error object
          }
          return response.json(); // Parse the successful response data
        });
      // Using any successful data is done by the caller, not by this function
      // - Keeps this function reusable and decoupled from the consumption of the results
    };
  
  
  export function fetchUpdate(word) {
    return fetch('/api/word/', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
      },
      body: JSON.stringify( {word} ),
    })
    // fetch() rejects on network error
    // So we convert that to a formatted error object
    // so our caller can handle all "errors" in a similar way
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  // response.ok checks the status code from the service
        // This service returns JSON on errors,
        // so we use that as the error object and reject
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); // happy status code means resolve with data from service
    });
  }
  
  export function fetchGetWord() {
    // Return a promise of parsed results or error object
    return fetch('/api/word/') // Using a relative url so we use the existing current page domain + protocol
      .catch( () => { // network error is rejected promise
        return Promise.reject({ error: 'networkError' }); // We return rejected promise with an error object!
      })
      .then( response => {
        if(!response.ok) { // Some sort of error status code
          return response.json().then( info => Promise.reject(info) ); // We return rejected promise with parsed error object
        }
        return response.json(); // Parse the successful response data
      });
  }
  
  export function fetchLogout(){
    return fetch('/api/session/', {
      method: 'DELETE'
    })
    .catch(() => {
      return Promise.reject({error: 'networkError'});
    })
    .then(response => {
      if(!response.ok){
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    })
  }