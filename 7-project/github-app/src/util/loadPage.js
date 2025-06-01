/**
 * Loads a new page into the app.
 * @param {function} pageFactoryFn - A function that creates the page.
 * @param {object} state - The state to pass to the page.
 */
export function loadPage(pageFactoryFn, state) {
  const appRoot = document.querySelector('#app-root');
  appRoot.innerHTML = '';
  const page = pageFactoryFn(state);
  appRoot.appendChild(page.root);
}
