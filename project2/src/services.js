export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }


  export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

 export function fetchChat() {
    return fetch('/api/chats')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  } 

  export function fetchAddChat(text) {
    return fetch('/api/chats', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { text } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }






