const chat =document.getElementById('chat');
const messageForm = document.getElementById('messageForm');
const messageInput =document.getElementById('messageInput');

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (e) => {
    console.log('Соединение успешно!');
}
socket.onmessage = (event) => {
  /* console.log('Получили сообщение: ', event.data); */
  const message = JSON.parse(event.data);
  const messageElement = document.createElement('div');
  console.log(message);
  if (message.type === 'system') {
    messageElement.classList.add('system-message');
  }
  messageElement.textContent = message.content;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        console.log('Соединение преравно!');
    }
}
socket.onerror = (error) => {
    console.log(`Ошибка ${error.message}`);
}
document.getElementById('sendButton').addEventListener ('click',
    function(){
        const messageInput = document.getElementById('messageInput');
        const messag = {           
            type:'user',
            content: messageInput.value.trim()
        };
        socket.send(JSON.stringify( messag));
        messageInput.value='';
    });
/*
messageForm.onsubmit = (e) => {
    e.preventDefalt();
    if (messageInput.value ) {
        const message = {
            type:'user',
            content: messageInput.value
        };
        socket.send(JSON.stringify(message));
        console.log(message);
        messageInput.value='';
    }
}*/