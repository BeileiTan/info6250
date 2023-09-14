const users_info = {};

function isValidName(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
  }
  
  function isValidEmail(email){
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }

  module.exports = {
    isValidEmail,
    isValidName,
    users_info,
  };