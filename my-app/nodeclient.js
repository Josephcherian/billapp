const net = require('net');
const client = net.createConnection({ port: 3000 }, () => {
 
  client.write('hello server');
});