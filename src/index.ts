import { config } from 'dotenv';
import { WebSocketServer } from 'ws';
import handleWSCommand from "./wsCommandHandler";
import createHTTPServer from "./createHTTPServer";

config();

const HTTP_PORT = Number(process.env.PORT) ?? 4000;

const httpServer = createHTTPServer();
const wss = new WebSocketServer({ server: httpServer });

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wss.on('connection', (ws) =>  {
    ws.on('message', async (data) => {
        console.log('received: %s', data);
        const result = await handleWSCommand(data)

        if (result) {
            ws.send(result);
        }
    });
});