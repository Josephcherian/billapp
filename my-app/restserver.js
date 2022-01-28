const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
var ObjectID = require('mongodb').ObjectID;

app.use(express.urlencoded());
app.use(express.json());
const port = 5050;


//Adding item to db
app.post('/customerdata', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');

    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';

    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);
            //console.log(req);
            var reqjson = req.body;
            // Insert a single document
            //console.log(reqjson);
            const r = await db.collection('customerinfo').insertOne(reqjson, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.jsonp({"id": result.insertedId});
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


//Fetching an item from db
app.get('/customerdata/:id', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
    //const assert = require('assert');

    const url = 'mongodb://localhost:27017';
    const dbName = 'testdb';

    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            console.log(ObjectID(req.params.id));
            var criteria = { _id : ObjectID(req.params.id)};   

            const cursor = await db.collection('customerinfo').find(criteria);

            const objects = await cursor.toArray();

            console.log(objects);
            res.jsonp(objects);
            res.end();
        } catch (err) {
            console.log(err.stack);
        }

        // Close connection
        client.close();
    })();
})

const server = http.createServer(app);
server.listen(port, () => { console.log('Running....') });
