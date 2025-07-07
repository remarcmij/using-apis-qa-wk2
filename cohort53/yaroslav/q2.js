async function sleepy() {
  // const result = await new Promise((r) => setTimeout(r(42), 5000));
  const result = await new Promise((r) => setTimeout(() => r(42), 5000));
  console.log('I’m awake');
  return result;
}
const result = sleepy();
console.log(result);
console.log(await result);

/* 
This snippet is executed instantly, and the await keyword is ignored. Does it 
happen because the return statement has precedence over the delayed action?
*/
