# Error Handling in Web Apps

We generally talk about a _happy path_ and an _error path_ (or _unhappy path_) with respect to the execution of your code.

- The _happy path_ is the execution path through your code if all is well: no errors encountered.
- The _error path_ is the execution path through your code if an error is encountered.

This section is about designing the _error path_. The ultimate goal is to inform the user of _anticipated_ application errors and, if possible, give options on how to gracefully recover from an error.

## Key Principles for Error Handling

1. **Prevent Crashes**: The function that normally expects valid data should not crash when it receives an error instead.

2. **Inform Users Properly**: Display errors on the page in user-friendly (non-technical) terms.

    Logging to the browser console is NOT equivalent to informing the user. End users do not routinely look for errors in the browsers console (developers on the other hand should always keep an eye on the console when developing for the browser).

3. **Test Your Error Handling**: Don't assume your error handling works - create scenarios where you deliberately force errors and verify your code handles them gracefully.

Good Error Messages Should:

1. **Be user-friendly**: "Unable to load data" instead of "HTTP 500 Internal Server Error"
2. **Suggest solutions**: "Check your internet connection and try again"
3. **Be visible**: Display in the main content area, not just the console
4. **Be actionable**: Include retry buttons or alternative options when possible

## Types of Errors

You should not try and handle JavaScript runtime errors or application bugs (i.e. unexpected errors), such as trying to modify a `const` variable, etc. Such errors are best allowed to crash your program (with a stack trace) so that you (as a developer) get alerted to the problem early and can promptly fix it.

### Anticipated Errors (Handle These)

- Network failures (no internet connection)
- API returning error status codes (404, 500, etc.)
- Invalid user input
- Missing or corrupted data

### Unexpected Errors (Let These Crash)

- Programming mistakes (typos, syntax errors)
- Trying to modify `const` variables
- Calling methods on `undefined` objects

## Pokemon Prep Exercise README

Until this week the code you have been working on is mostly your own and is generally very static which means that if it works once it will most likely keep working in the same way. When interacting with external API's over the internet this goes out the window. You have no control over the data the API gives and although usually fine, the internet is always going to be unreliable. This means your code needs to be able to handle it when something goes wrong and inform the user.

In this exercise we'll focus on the fetching and error handling part of working with an API, which you can use to work with any other code where a possible problem can occur. The `index.js` gives you instructions on what to do, there is some code there already, but feel free to alter that if needed.

The expected behaviour is as follows:

- When you press the **Get Data** button with the **Use invalid URL** checkbox **unchecked** the data from the Pokemon API will be fetched and rendered as JSON on the page.

- When you press the button with the checkbox **checked** an HTTP error message will be rendered on the page.

## Things to think about

- If you look at the `index.html` you can see our error rendering is put into a regular `div` element, but our pokemon json is put into a `pre` element. Why is that?
- The comments say to handle the error in the main function. What do you think the advantages are of doing it this way? What about if you would do the error handling in the `fetchJSON` function?
- Some students ask us why not just put `try/catch` blocks around the main function and have that as the place to catch all errors. Why do you think we do not suggest doing this?
