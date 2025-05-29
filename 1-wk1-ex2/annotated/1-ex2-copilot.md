## Prompt

When I run the code I get this output:

```plaintext
This is a double digit number!
This is a double digit number!
Expected a double digit number but got 9
Expected a double digit number but got 100
```

I expected this order:

```plaintext
Expected a double digit number but got 9
This is a double digit number!
This is a double digit number!
Expected a double digit number but got 100
```

Why is the output order different than expected?

## Response

### What you expected

You expected the output to match the order of the function calls in `main()`:

1. `checkDoubleDigits(9)` (rejected)
2. `checkDoubleDigits(10)` (resolved)
3. `checkDoubleDigits(99)` (resolved)
4. `checkDoubleDigits(100)` (rejected)

So, you expected the error for 9 first, then the two successes, then the error for 100.

### What actually happens

The actual output is:

```plaintext
This is a double digit number!  
This is a double digit number!  
Expected a double digit number but got 9  
Expected a double digit number but got 100  
```

### Why does this happen?

- **Promises are asynchronous**: The executor function inside each Promise runs synchronously, but the `.then()` and `.catch()` handlers are always called asynchronously (in a microtask, after the current call stack).
- **All four `checkDoubleDigits` calls are started one after another, synchronously.**
- The order in which the microtasks (the `.then()`/`.catch()` handlers) are executed depends on when the promises are settled.

#### In your code:

- For `checkDoubleDigits(9)`, the promise is **rejected immediately**.
- For `checkDoubleDigits(10)` and `checkDoubleDigits(99)`, the promises are **resolved immediately**.
- For `checkDoubleDigits(100)`, the promise is **rejected immediately**.

However, **in V8 (Node.js, Chrome, etc.), resolved promises' `.then()` handlers are placed in the microtask queue before rejected promises' `.catch()` handlers if they are created in the same tick**. This is because `.then()` is attached before `.catch()` for resolved promises, and the microtask queue processes them in the order they were added.

So, the two resolved promises (`10` and `99`) have their `.then()` handlers queued first, followed by the `.catch()` handlers for the rejected promises (`9` and `100`).


### Summary Table

| Call                   | Promise Settled | Handler Queued      | Output Order |
|------------------------|-----------------|---------------------|--------------|
| `checkDoubleDigits(9)`   | rejected        | `.catch()`          | 3            |
| `checkDoubleDigits(10)`  | resolved        | `.then()`           | 1            |
| `checkDoubleDigits(99)`  | resolved        | `.then()`           | 2            |
| `checkDoubleDigits(100)` | rejected        | `.catch()`          | 4            |


## **Conclusion**

**The order of outputs is determined by the order in which the microtasks are queued, not the order of the function calls.**  
Resolved promises' `.then()` handlers are queued before rejected promises' `.catch()` handlers if all are created in the same synchronous block.

That’s why you see the two success messages before the error messages.
