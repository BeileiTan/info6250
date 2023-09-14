const uuid = require('uuid').v4;

const messageList = {};
const chats = {};
const senderList = {};
const senders = {};

function makeUserList(){

    function makeChatList(){
    
        messageList.getChats = function getChats(){
            return chats;
        }
    
        messageList.addChat = function addChat(sender, text){
            const id = uuid();
            chats[id] = {
                id,
                sender,
                text,
              };
              return id;
        }
    
        messageList.getChat = function getChat(id) {
            return chats[id];
          };
    
        return messageList;
    };
    
    
    function makeSenderList(){ 
        senderList.getSenders = function getSenders(){
            return senders;
        }
    
        senderList.addSender = function addSender(sender){
            senders[sender] = {sender};
            return sender;
        }
    
        senderList.getSender = function getSender(sender){
            return senders[sender];
        }
        return senderList;
    }
    
    return {
        makeChatList: makeChatList,
        makeSenderList: makeSenderList
    }
}

module.exports = {
    makeUserList
  };
  