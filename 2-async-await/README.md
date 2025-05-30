# async/await Quiz

Folder: `2-async-await`

## Introduction

The `async/await` syntax was introduced in ECMAScript 2017 (ES8) to simplify working with promises. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.

## Why Use `async/await`?

While `.then()` and `.catch()` are effective for handling promises, `async/await` offers several advantages:

- **Improved readability**: Code flows more naturally, avoiding nested chains.
- **Simpler error handling**: Use `try/catch` for errors instead of `.catch()`.

## How It Works

- **`async` functions**: Declared with the `async` keyword, they always return a Promise. If a value is returned, it is wrapped in a resolved Promise.
- **`await` keyword**: Pauses execution until the Promise resolves or rejects.

Many current JavaScript host environments (e.g., browsers and Node.js), as well as modern JavaScript libraries, return promises on which you can use `async/await`. (Of course, `.then()` and `.catch()` can still be used, but `async/await` is often preferred for its readability.)

If a promise is not provided out of the box for some async operation you can still create one yourself using the Promise constructor:

```javascript  
new Promise((resolve, reject) => { 
  ... 
});
```

## Instructions

Starting with `1-async-await.js`, analyze the given code and predict the expected output.
