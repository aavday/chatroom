// dom queries

const chatList = document.querySelector('.chat-list');
const newChatsForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const nameUpdatedMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms')

// add a new chat

newChatsForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = newChatsForm.message.value.trim();
  chatroom.addToChat(message)
    .then(() => newChatsForm.reset())
    .catch(err => console.log(err));
});

// update username

newNameForm.addEventListener('submit', event => {
  event.preventDefault();

  // update name via chatroom

  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  // reset the form

  newNameForm.reset();

  // show then hide the update message

  nameUpdatedMessage.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => nameUpdatedMessage.innerText = '', 3000);
});

// update the chat room

rooms.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(event.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for a name

const username = localStorage.username ? localStorage.username : 'anon';

// class instances

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render

chatroom.getChats(data => chatUI.render(data));