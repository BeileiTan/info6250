const users = {};


function getUserData(email) {
  return users[email];
}

function addUserData(email, userData) {
  users[email] = userData;
}

module.exports = {
  getUserData,
  addUserData,
};
