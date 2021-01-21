//
//

import { AddressInfo } from 'net';

import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

const server = app.listen(9000, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on: http://' + address +  ':' + port);
});
