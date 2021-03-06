const fs = require('fs');
const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: 5001,
  path: '/',
  ssl: {
    key: fs.readFileSync(__dirname + '/ssl/nginx.key'),
    cert: fs.readFileSync(__dirname + '/ssl/nginx.crt')
  }
});