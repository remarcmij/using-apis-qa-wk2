# Promise Sequencing Examples

This folder contains examples demonstrating different methods to execute promises in sequence (one after another) rather than in parallel. Understanding these patterns is crucial for controlling the flow of asynchronous operations in JavaScript.

## Scenario: Binge-Watching Episodes

All examples use the same scenario: playing episodes of "The Queen's Gambit" series one after another, simulating a video streaming experience where each episode must finish before the next one starts.

## Callback Examples (0-callbacks/)

Before promises were introduced in JavaScript, developers used callbacks to handle asynchronous operations. These examples show the "old way" of doing things.

### 1-chain.js - Callback Hell

```javascript
function bingeWatch(videos) {
  playVideo(videos[0], () =>
    playVideo(videos[1], () =>
      playVideo(videos[2], () =>
        // ... nested callbacks continue
      )
    )
  );
}
```

**What it demonstrates:** The infamous "callback hell" or "pyramid of doom" - deeply nested callbacks that become hard to read and maintain.

**Problems:**

- Difficult to read and understand
- Hard to handle errors
- Becomes unmanageable with many operations

### 2-recursion.js - Recursive Callbacks

```javascript
function bingeWatch(videos, index = 0) {
  playVideo(videos[index], () => {
    if (index < videos.length - 1) {
      bingeWatch(videos, index + 1);
    }
  });
}
```

**What it demonstrates:** A cleaner approach using recursion to avoid deep nesting while still using callbacks.

**Advantages:**

- More readable than nested callbacks
- Can handle any number of items
- Avoids the "pyramid of doom"

## Promise Examples

Promises were introduced to solve the problems with callbacks. These examples show various ways to chain promises sequentially.

### 1-chain.js - Manual Promise Chaining

```javascript
function bingeWatch(videos) {
  playVideo(videos[0])
    .then(() => playVideo(videos[1]))
    .then(() => playVideo(videos[2]))
    // ... continues for each video
}
```

**What it demonstrates:** Basic promise chaining using `.then()` methods.

**Problems:**

- Still requires manual chaining for each item
- Not scalable for dynamic arrays
- Repetitive code

### 2-recursion.js - Recursive Promises

```javascript
function bingeWatch(videos, index = 0) {
  playVideo(videos[index]).then(() => {
    if (index < videos.length - 1) {
      bingeWatch(videos, index + 1);
    }
  });
}
```

**What it demonstrates:** Using recursion with promises to avoid manual chaining.

**Advantages:**

- Works with any array length
- Cleaner than manual chaining
- Similar pattern to callback recursion but with promises

### 3-forEach.js - Building a Promise Chain

```javascript
function bingeWatch(videos) {
  let promise = Promise.resolve();
  videos.forEach((video) => {
    promise = promise.then(() => playVideo(video));
  });
  return promise;
}
```

**What it demonstrates:** Dynamically building a promise chain using `forEach`.

**How it works:**

1. Start with a resolved promise
2. For each video, chain a new `.then()` call
3. Each iteration updates the promise variable
4. Creates a sequential chain automatically

### 4-reduce.js - Elegant Promise Sequencing

```javascript
function bingeWatch(videos) {
  return videos.reduce((promise, video) => {
    return promise.then(() => playVideo(video));
  }, Promise.resolve());
}
```

**What it demonstrates:** The most elegant and functional approach using `reduce`.

**Why it's great:**

- Concise and readable
- Functional programming style
- Naturally returns a promise
- Works with any array length

**How it works:**

- `reduce` starts with `Promise.resolve()` as the initial value
- Each iteration chains the next operation
- The accumulator is always the current promise in the chain

### 5-async-await.js - Modern Syntax

```javascript
async function bingeWatch(videos) {
  for (const video of videos) {
    await playVideo(video);
  }
}
```

**What it demonstrates:** The modern, most readable approach using async/await.

**Advantages:**

- Looks like synchronous code
- Easy to understand and debug
- Natural error handling with try/catch
- Most intuitive for beginners

### 6-promise-all.js - Parallel Execution (Counterexample)

```javascript
function bingeWatch(videos) {
  const promises = videos.map((video) => playVideo(video));
  Promise.all(promises).then((results) => console.log(results));
}
```

**What it demonstrates:** What happens when you DON'T want sequential execution.

**Important note:** This runs all videos in parallel (at the same time), not sequentially. It's included to show the difference between parallel and sequential execution.

## Key Learning Points

### Sequential vs Parallel

- **Sequential**: Operations run one after another (what most examples show)
- **Parallel**: Operations run at the same time (`Promise.all` example)

### Evolution of Asynchronous JavaScript

1. **Callbacks** → Hard to read, "callback hell"
2. **Promises** → Better error handling, chainable
3. **Async/Await** → Most readable, easiest to understand

### When to Use Each Pattern

- **async/await**: Default choice for most scenarios (easiest to read and debug)
- **reduce**: When you want a functional programming style
- **recursion**: When you need more complex control flow
- **forEach/manual chaining**: Generally avoid these patterns

### Common Mistake

Using `Promise.all()` when you want sequential execution. Remember:

- `Promise.all()` = parallel (all at once)
- Sequential patterns = one after another

## Running the Examples

To run any example:

```bash
node 1-chain.js
node 2-recursion.js
# ... etc
```

Each example will simulate playing video episodes with 1-second delays, showing you the sequential execution pattern in action.
