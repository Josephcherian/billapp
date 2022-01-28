
var options = {
    host: 'www.google.com',
    port: 80
  };
  
  http.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      fs.writeFile('index.html', rawData , (err) => {
          console.log("error");
      })
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });