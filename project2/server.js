const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const userData = require('./chats');
const sessions = require('./sessions');
const users = require('./users');


app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({ username });
  });

app.post('/api/session', (req, res) => {
    const { username } = req.body;
  
    if(!users.isValid(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = sessions.addSession(username);
    res.cookie('sid', sid);

    const messageLists = userData.makeUserList().makeChatList().getChats();
    const senderLists = userData.makeUserList().makeSenderList().getSenders();
    res.json({messageLists, senderLists});
  });
  
  app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(username) {
      // Delete the session, but not the user data
      sessions.deleteSession(sid);
    }
  
    const senderLists = userData.makeUserList().makeSenderList().getSenders();
    
    if(senderLists[username]){
      delete senderLists[username];
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
  });

  //Chats
  app.get('/api/chats', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // I've left the repetitive sections here for ease of learning
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const messageLists = userData.makeUserList().makeChatList().getChats();
    const senderLists = userData.makeUserList().makeSenderList().getSenders();
    res.json({messageLists, senderLists});;
  });

  app.post('/api/chats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { text } = req.body;
    if(!text) {
      res.status(400).json({ error: 'required-text' });
      return;
    }
    const messageList = userData.makeUserList().makeChatList();
    const id = messageList.addChat(username, text);
    const message = messageList.getChat(id);
    const senderList = userData.makeUserList().makeSenderList();
    const name = senderList.addSender(username);
    const sender = senderList.getSender(name);

    res.json({message, sender});
  });



  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


