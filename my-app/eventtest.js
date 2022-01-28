const EventEmitter = require('events').EventEmitter;

console.log("starting");

/*var myemitter = new EventEmitter();
myemitter.on('event1', (arr) => {
    console.log("Handling event1" + arr);
});

myemitter.on('event1', () => {
    setImmediate(() => {
        console.log('this happens asynchronously');
      });
});

setTimeout(() => {
    console.log("emitting");
    myemitter.emit('event1', ["abc","def"]);
},5000);
*/

function loginUser(email,password) {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            console.log("inside settimeout");
            resolve({"email" : email, "pass": password});
        },3000);
    })
    
}


function getVideos(email) {
    return new Promise ( (resolve,reject) => {
        setTimeout(() => {
            console.log("inside settimeout");
            resolve(["video1", "video2"]);
        },2000);
    })
    
}

function getVideoDetails(video) {
    return new Promise ( (resolve,reject) => {
        setTimeout(() => {
            console.log("inside settimeout");
            resolve("title 1");
        },1000);
    })
    
} 
/*var user = loginUser("abc@xyz.com","123456", user => {
    console.log(user);
    getVideos(user.email, (videos) => {
        console.log(videos);
    })
});*/

/*var promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("inside settimeout");
        resolve({"email" : "email", "pass": "password"});
    },5000);
})

promise.then((user) => {
    console.log(user);
}).catch(error => {
    console.log("error" + error);
})*/

/*loginUser("abc@xyz.com","123456")
.then((user) => getVideos(user.email))
.then((videos) => getVideoDetails(videos[0]))
.then (details => console.log(details));*/

async function displayUser() {
    var user  =  await loginUser("abc@xyz.com","123456");
    var videos = await getVideos(user.email);
    var details = await getVideoDetails(videos[0]);
    console.log(details);
}
displayUser();
console.log("ending");