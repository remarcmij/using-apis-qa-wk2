async function sleepy() {
  setTimeout(() => {
    const result = 42;
    console.log('I’m awake');
    return result;
  }, 1000);
}

const result = sleepy();
console.log(result);

// async function sleepy() {
//   const result = 42;
//   console.log("I’m awake");
//   return result;
// }
// const result = sleepy();
// console.log(result);
