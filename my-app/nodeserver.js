const net = require('net');
const server = net.createServer((c) => {
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello client');
  c.pipe(c);
  c.on('data', (data) =>  {
      console.log(data.toString('utf8'));
  });
});

server.listen(3000, () => {
  console.log('server bound');
});