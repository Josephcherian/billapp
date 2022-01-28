const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}

const doSomethingAsyncelse = () => {
  return new Promise(resolve => {
   resolve('I did something else');
  })
}
const doSomething = async () => {
  console.log("starting");
  console.log(await doSomethingAsync())
  console.log(await doSomethingAsyncelse());
}

console.log('Before')
doSomething()
console.log('After')