//
//

// NodeJS modules
import { AddressInfo } from 'net';

// 3rd Party Modules
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

// Create the Express application instance
const app = express();

// Load middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello world');
});

// Run the Express server
const server = app.listen(9000, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on: http://' + address +  ':' + port);
});
