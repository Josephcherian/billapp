const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
var ObjectID = require('mongodb').ObjectID;

app.use(express.urlencoded());
app.use(express.json());
const port  = 5050;
console.log(__dirname);
app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

//Adding item to inventory
app.post('/inventory', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    //console.log(req);
    var reqjson = req.body;
    // Insert a single document
    console.log(reqjson);
    const r = await db.collection('inventory').insertOne(reqjson,function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.jsonp(result);
        res.end();
      });

    //assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
    })


    //Fetching item to inventory
app.get('/inventory/:type', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    var criteria;
    if(req.params.type == 'tyres') {
            criteria = ["TTF", "TLR","TL","T","TU","FL"];
    } else if(req.params.type == 'parts'){
        criteria = ["P"];
    } else {
        criteria = ["L"];
    }



    
    const cursor = await db.collection('inventory').find({ productType: { $in: criteria } });

    const objects = await cursor.toArray();

    console.log(objects);
    res.jsonp(objects);
    res.end();
    // Iterate over the cursor
    /*while(await cursor.hasNext()) {
        const doc = await cursor.next();
        console.log(doc);
    }*/

    //assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
    })


//Updating item to inventory
app.put('/inventory', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    //console.log(req);
   
     var reqjson = req.body;
    console.log(reqjson);
    const r = await db.collection('inventory').updateOne({"_id": ObjectID(reqjson._id)},
        {$set: {"quantity": reqjson.quantity,"tyreAmount": reqjson.tyreAmount,"tubeAmount":reqjson.tubeAmount,"flapAmount":reqjson.flapAmount,"totalAmount":reqjson.totalAmount}},
        function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.jsonp(result);
        res.end();
      });

    //assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
    })


        //Fetching item to inventory
app.delete('/inventory/:id', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
        
    const cursor = await db.collection('inventory').remove({"_id": ObjectID(req.params.id)});
   
    res.jsonp(cursor);
    res.end();
    // Iterate over the cursor
    /*while(await cursor.hasNext()) {
        const doc = await cursor.next();
        console.log(doc);
    }*/

    //assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
    })

    //Fetching item to inventory
app.get('/inventory/search/:searchkey', function (req, res) {
        const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');
    
    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';
    
    (async function() {
      const client = new MongoClient(url);
    
      try {
        await client.connect();
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);

               
        //const cursor = await db.collection('inventory').find({productDescription: {$regex:"/"+ req.params.searchkey+"/i"}});
        const cursor = await db.collection('inventory').find({ $text: { $search: req.params.searchkey } });
        const objects = await cursor.toArray();
    
        console.log(objects);
        res.jsonp(objects);
        res.end();
        // Iterate over the cursor
        /*while(await cursor.hasNext()) {
            const doc = await cursor.next();
            console.log(doc);
        }*/
    
        //assert.equal(1, r.insertedCount);
      } catch (err) {
        console.log(err.stack);
      }
    
      // Close connection
      client.close();
    })();
        })

    //Fetching all item from  inventory
    app.get('/inventory', function (req, res) {
        const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');
    
    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';
    
    (async function() {
      const client = new MongoClient(url);
    
      try {
        await client.connect();
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);
            
        
        const cursor = await db.collection('inventory').find({},{productDescription:1,productType:1,totalAmount:1,_id:0});
    
        const objects = await cursor.toArray();
    
        console.log(objects);
        res.jsonp(objects);
        res.end();
        // Iterate over the cursor
        /*while(await cursor.hasNext()) {
            const doc = await cursor.next();
            console.log(doc);
        }*/
    
        //assert.equal(1, r.insertedCount);
      } catch (err) {
        console.log(err.stack);
      }
    
      // Close connection
      client.close();
    })();
        })

//Fetching tax rates
    app.get('/tax', function (req, res) {
            const MongoClient = require('mongodb').MongoClient;
        //const assert = require('assert');
        
        const url = 'mongodb://localhost:27017';
        const dbName = 'testdb';
        
        (async function() {
          const client = new MongoClient(url);
        
          try {
            await client.connect();
            console.log("Connected correctly to server");
        
            const db = client.db(dbName);
                
            
            const cursor = await db.collection('taxrates').find({},{productType:1,CGST:1,SGST:1,CESS:1,_id:0});
        
            const objects = await cursor.toArray();
        
            console.log(objects);
            res.jsonp(objects);
            res.end();
            // Iterate over the cursor
            /*while(await cursor.hasNext()) {
                const doc = await cursor.next();
                console.log(doc);
            }*/
        
            //assert.equal(1, r.insertedCount);
          } catch (err) {
            console.log(err.stack);
          }
        
          // Close connection
          client.close();
        })();
            })

    //Adding item to inventory
app.post('/billing', function (req, res) {
        const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');
    
    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';
    
    (async function() {
      const client = new MongoClient(url);
    
      try {
        await client.connect();
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);
        //console.log(req);
        var reqjson = req.body;
        const filter = { invoicenum: reqjson.invoicenum };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
              date:reqjson.date,
              totalBillAmount:reqjson.totalBillAmount,
              buyerAddress: reqjson.buyerAddress
            },
            $setOnInsert: { 
                invoicenum: reqjson.invoicenum
             }
          };
        // Insert a single document
        console.log(reqjson);
        const r = await db.collection('billdetails').updateOne(filter, updateDoc, options,function(err, result) {
            if (err) throw err;
            //console.log(result);
            res.jsonp(result);
            res.end();
          });
    
        //assert.equal(1, r.insertedCount);
      } catch (err) {
        console.log(err.stack);
      }
    
      // Close connection
      client.close();
    })();
        })

    //Adding item to inventory
app.post('/billing/items', function (req, res) {
        const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');
    
    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';
    
    (async function() {
      const client = new MongoClient(url);
    
      try {
        await client.connect();
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);
        //console.log(req);
        var reqjson = req.body;
        
        const r = await db.collection('billitems').insertMany(reqjson,function(err, result) {
            if (err) throw err;
            //console.log(result);
            res.jsonp(result);
            res.end();
          });
    
        //assert.equal(1, r.insertedCount);
      } catch (err) {
        console.log(err.stack);
      }
    
      // Close connection
      client.close();
    })();
        })

    //Fetching bill details
        app.get('/billing', function (req, res) {
                const MongoClient = require('mongodb').MongoClient;
            //const assert = require('assert');
            
            const url = 'mongodb://localhost:27017';
            const dbName = 'testdb';
            
            (async function() {
              const client = new MongoClient(url);
            
              try {
                await client.connect();
                console.log("Connected correctly to server");
            
                const db = client.db(dbName);
                    
                
                const cursor = await db.collection('billdetails').find({},{invoicenum:1,date:1,buyerAddress:1,totalBillAmount:1,_id:0});
            
                const objects = await cursor.toArray();
  
                res.jsonp(objects);
                res.end();
                // Iterate over the cursor
                /*while(await cursor.hasNext()) {
                    const doc = await cursor.next();
                    console.log(doc);
                }*/
            
                //assert.equal(1, r.insertedCount);
              } catch (err) {
                console.log(err.stack);
              }
            
              // Close connection
              client.close();
            })();
                })
        
     //Fetching bill using invoicenum
         app.get('/billing/:billno', function (req, res) {
                const MongoClient = require('mongodb').MongoClient;
            //const assert = require('assert');
            
            const url = 'mongodb://localhost:27017';
            const dbName = 'testdb';
            
            (async function() {
              const client = new MongoClient(url);
            
              try {
                await client.connect();
                console.log("Connected correctly to server");
            
                const db = client.db(dbName);
                console.log(req.params.billno);
                var criteria = { invoicenum : Number(req.params.billno)};    
                
                const cursor = await db.collection('billdetails').find(criteria,{invoicenum:1,date:1,buyerAddress:1,totalBillAmount:1,_id:0});      
                const objects = await cursor.toArray();
                res.jsonp(objects);
                res.end();
                // Iterate over the cursor
                /*while(await cursor.hasNext()) {
                    const doc = await cursor.next();
                    console.log(doc);
                }*/
            
                //assert.equal(1, r.insertedCount);
              } catch (err) {
                console.log(err.stack);
              }
            
              // Close connection
              client.close();
            })();
                })

    //Fetching billitems using invoicenum
        app.get('/billing/:billno/billitems', function (req, res) {
                const MongoClient = require('mongodb').MongoClient;
            //const assert = require('assert');
            
            const url = 'mongodb://localhost:27017';
            const dbName = 'testdb';
            
            (async function() {
              const client = new MongoClient(url);
            
              try {
                await client.connect();
                console.log("Connected correctly to server");
            
                const db = client.db(dbName);
                console.log(req.params.billno);
                var criteria = { invoicenum : Number(req.params.billno)};    
                
                const cursor = await db.collection('billitems').find(criteria,{_id:0});      
                const objects = await cursor.toArray();
                res.jsonp(objects);
                res.end();
                
              } catch (err) {
                console.log(err.stack);
              }
            
              // Close connection
              client.close();
            })();
                })
const server  =  http.createServer(app);
server.listen(port,() => {console.log('Running....')});
