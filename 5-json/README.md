# Introduction to JSON

JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging information. It is easy to read and write for humans, and simple to parse and generate for machines. JSON is widely used in web development, especially for APIs, because it is language-independent and works seamlessly with JavaScript.

A JSON object consists of key-value pairs, where keys are strings and values can be strings, numbers, arrays, objects, or boolean values. Here's an example:

```json
{
  "name": "John",
  "age": 30,
  "isStudent": false,
  "skills": ["JavaScript", "React", "Node.js"],
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}
```

In this example:

- `"name"` is a string.
- `"age"` is a number.
- `"isStudent"` is a boolean.
- `"skills"` is an array of strings.
- `"address"` is another JSON object.

JSON is commonly used to send data between a server and a client, making it an essential format for modern web applications.

## Exercises

Starting with `1-json.js`, analyze the given code and predict the expected output.
