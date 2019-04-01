import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as joi from 'joi';

import * as twilio from './twillio';

const log = require('debug')('app:server');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(':method :url :status - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../../web/dist')));

app.get('/status', (req, res) => res.send('Hello World!'));

app.post('/subscribe', (req, res) => {
    const data = req.body;

    const toNumber = req.body.to;

    log(`Sending sms to ${toNumber}`);

    twilio.sms('You are now subscribed to a Blokta writer!', toNumber).then(result => {
        res.send({ complete: true });
    });
});

app.use('**', express.static(path.resolve(__dirname, '../../web/dist')));

app.listen(port, () => log(`Example app listening on port ${port}!`));
