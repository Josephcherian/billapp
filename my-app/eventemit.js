const eventEmitter = require('events').EventEmitter;

console.log("starting");

var myemitter = new eventEmitter();
myemitter.on('event1', () => {
    console.log("Handling event1");
});

myemitter.on('event2', () => {
    console.log("Handling event2");
});

myemitter.on('event3', () => {
    console.log("Handling event3");
});

setTimeout(() => {
    console.log("emitting");
    myemitter.emit('event1');
},1000);


setTimeout(() => {
    console.log("emitting");
    myemitter.emit('event2');
},2000);


setTimeout(() => {
    console.log("emitting");
    myemitter.emit('event3');
},3000);
