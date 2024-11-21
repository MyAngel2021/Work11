const chat = document.getElementById('chat');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messageInputName = document.getElementById('messageInputName');

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (e) => {
  console.log('Соединение успешно!');
};
socket.onmessage = (event) => {
  /* console.log('Получили сообщение: ', event.data); */
  const message = JSON.parse(event.data);
  const messageElement = document.createElement('div');
  console.log(message);
  if (message.type === 'system') {
    messageElement.classList.add('system-message');
    const userNik = JSON.parse(localStorage.getItem('user'));
    if (userNik) {
      console.log(userNik);
      messageElement.textContent = message.content + ' ' + userNik;
      messageInputName.value = userNik;
    } else {
      messageElement.textContent = message.content;
    }
  } else if (message.user) {
    messageElement.textContent = message.user + ':' + message.content;
  } else {
    messageElement.textContent = message.content;
  }

  chat.appendChild(messageElement);
  messageElement.scrollIntoView();
};
socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `Соединение закрыто чисто, код=${event.code} причина=${event.reason}`,
    );
  } else {
    console.log('Соединение преравно!');
  }
};
socket.onerror = (error) => {
  console.log(`Ошибка ${error.message}`);
};
document.getElementById('sendButton').addEventListener('click', function () {
  const messageInput = document.getElementById('messageInput');
  const messageInputName = document.getElementById('messageInputName');
  if (messageInput.value.trim() > '') {
    const messag = {
      type: 'user',
      user: messageInputName.value.trim(),
      content: messageInput.value.trim(),
    };
    socket.send(JSON.stringify(messag));
    messageInput.value = '';
    if (messageInputName.value.trim() > '') {
      localStorage.setItem('user', JSON.stringify(messageInputName.value));
    }
  }
});
