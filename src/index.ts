import express = require('express');
import http = require('http');
import { CallConnector } from 'botbuilder-calling';
import { CALL_SETTINGS } from './config';
import createBot from './my-bot';

const port = process.env.port || 3001;
const app = express();
const server = http.createServer(app);
const connector = new CallConnector(CALL_SETTINGS);
createBot(connector);

app.post('/api/calls', connector.listen());
server.listen(port, () => console.log(`Listening on ${port}`));
