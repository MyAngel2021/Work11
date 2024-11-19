const WebSocked = require('ws') ;
const wss = new WebSocked.Server({port:8080});
let clients =[];
wss.on('connection', (ws) => {
    console.log('Новый клиент подключился!');
   clients.push(ws);
    ws.send(JSON.stringify({
        type: 'system',
        content: 'Добро пожаловать в чат!'
    }));
    ws.on('message', (message) => {
        let parseMessage;
        try {
            parseMessage = JSON.parse(message);
            console.log(`Получено сообщение: ` , parseMessage);
        } catch (error) {
            console.log("Произошла ошибка при обработке сообщения:" + error);
            return;
        }
    wss.clients.forEach(client => {
            if(client.readyState === WebSocked.OPEN) {
                client.send(JSON.stringify(parseMessage));
            }
        })
});
ws.on('close', function() {
   clients = clients.filter((client) => client!=ws);
    console.log('клиент отключился!');
  });
    
});
console.log('сервер запущен на localhost:8080');