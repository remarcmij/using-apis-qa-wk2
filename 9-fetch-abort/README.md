# Aborting a Fetch Request with Promises

## Cancelling a Promise

You cannot cancel a Promise. A Promise is just a way to be notified when an asynchronous operation finishes (either successfully or with an error). However, Promises do not provide any way to stop or control the underlying operation once it has started.

If you need to be able to cancel an asynchronous operation (like a network request), you must use a separate mechanism—such as an `AbortController` with fetch—to signal cancellation. The Promise will only reflect the result of the operation, not control it.

## Example

The `getPokemons` function in [app.js](week2/fetch-abort/app.js) is an asynchronous JavaScript function designed to
fetch a list of Pokémon from a remote API. It begins by creating an
`AbortController`, which allows the function to cancel the fetch request if it
takes too long. The function then selects two DOM elements: the button that
triggers the fetch (`#fetch-btn`) and the output area (`#output`). To provide
immediate feedback to the user and prevent multiple simultaneous requests, the
button is disabled and the output area displays a "Loading..." message.

To avoid waiting indefinitely for a slow network response, the function sets up
a timeout using `setTimeout`. If the fetch request does not complete within the
specified time (`ABORT_TIMEOUT_MS`), the controller aborts the request. The
fetch call itself is made with the abort signal attached, so it can be cancelled
if necessary. If the fetch completes before the timeout, the timeout is cleared
to prevent the abort from firing after the fact.

Once the response is received, the function checks if it was successful by
examining the `ok` property. If the response is not OK (for example, if the
server returns a 404 or 500 error), an error is thrown. If the response is
successful, the JSON data is parsed and displayed in the output area in a
readable format. If an error occurs during the fetch, the function checks if it
was due to the abort; if so, it displays a specific message indicating the
request took too long. Otherwise, it shows the error message. Finally,
regardless of the outcome, the fetch button is re-enabled so the user can try
again. This approach ensures a responsive and user-friendly experience when
interacting with potentially slow APIs.
