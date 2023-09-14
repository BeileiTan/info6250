// constants are just references to values (string values here)
// collected in one place and defined as const
//
// You do not have to use constants
// But done well they:
// - Make it easier to avoid typos
// - Help make use of IDE completion
// - Make it easy if the value changes
//    - only need to change the value here
//    - the constant reference doesn't change

export const LOGIN_STATUS = {
    PENDING: 'pending',
    REGISTERING : 'registering',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
  };
  
  // Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_EMAIL: 'required-email',
    REQUIRED_USERNAME: 'required-name',
    REQUIRED_SIGNUP: 'not-registered',
    REQUIRED_TASK: 'required-task',
    AUTH_CONFLICT:'auth-conflict',
    TASK_MISSING: 'noSuchId', // Someone was inconsistent!
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_INSUFFICIENT]: 'Your email/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_EMAIL]: 'Please enter a valid (letters and/or numbers) email',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_SIGNUP]: 'The account does not exist, please create a new one',
    [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
    [SERVER.AUTH_CONFLICT]: 'The email is already exists',
    default: 'Something went wrong.  Please try again',
  };
  
  