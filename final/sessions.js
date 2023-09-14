const uuid = require('uuid').v4;

const sessions = {};

function addSession(email) {
  const sid = uuid();
  sessions[sid] = {
    email,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.email;
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
};