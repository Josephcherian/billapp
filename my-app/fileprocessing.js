const fs = require('fs');
const readline = require('readline');
const http =  require('http');

(async function() {
const rl = readline.createInterface({
    input: fs.createReadStream('./csvfold/dataset.csv'),
    crlfDelay: Infinity
});

let firstline = true;

let firstdata =  null;
let lastdata =  null;
let firstid =  null;
let lastid =  null;

let reqcount = 0;
let respcount = 0;

rl.on('line', (line) => {

    if (firstline != true) {
        var tokens = line.split(',');
        var data = {
            "MSISDN": "", "IMSI": "", "uploadddedicated": "", "downloaddedicated": "", "uploadcommercial": "",
            "downloadcommercial": "", "APN": ""
        };
        data.MSISDN = tokens[0];
        data.IMSI = tokens[1];
        data.uploadddedicated = tokens[2];
        data.downloaddedicated = tokens[3];
        data.uploadcommercial = tokens[4];
        data.downloadcommercial =  tokens[5];
        data.APN = tokens[6];

        if(firstdata === null) {
          firstdata = data;
        } else {
          lastdata = data;
        }

        var myJSON = JSON.stringify(data);
        console.log(myJSON);
        const options = {
            hostname: 'localhost',
            port: 5050,
            path: '/customerdata',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          };
          console.log("sending req");
          reqcount++;
          const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              console.log(`BODY: ${chunk}`);
              respcount++;
              if(firstid === null) {
                firstid = JSON.parse(chunk).id;
                console.log(firstid);
              } else {
                lastid = JSON.parse(chunk).id;
                console.log(lastid);
              }
              if(reqcount === respcount) {
                (async function () {
                  // wait to http request to finish
                  console.log(firstid);
                  let ret = await makeSynchronousRequest(firstid);
                  console.log(ret);
                  console.log(lastid);
                  let ret1 = await makeSynchronousRequest(lastid);
                  console.log(ret1);
                })();
              }

            });
            res.on('end', () => {
              //console.log('No more data in response.');
            });
          });
          
          req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
          });
          
          // Write data to request body
          req.write(myJSON);
          req.end();
    }
    firstline = false;
});

rl.on('close', () => {
  
  console.log("firstdata" + JSON.stringify( firstdata));
  console.log("lastdata" + JSON.stringify(lastdata));

  fs.copyFile('./csvfold/dataset.csv', './archivefold/dataset.csv', (err) => {
    if (err) throw err;
    console.log("file archived");
  });
  
});

})();

// function returns a Promise
function getPromise(id) {
	return new Promise((resolve, reject) => {
    let url  = 'http://localhost:5050/customerdata/' + id;
    console.log(url);
		http.get(url, (response) => {
      response.setEncoding('utf8');
		 response.on('data', (resp) => {
				resolve(resp);
			});
		 response.on('error', (error) => {
				reject(error);
			});
		});
	});
}

// async function to make http request
async function makeSynchronousRequest(id) {
	try {
		let http_promise = getPromise(id);
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		return (response_body);
	}
	catch(error) {
		// Promise rejected
		console.log(error);
  }
}

