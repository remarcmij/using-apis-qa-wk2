/**
 * Creates the error view.
 * @param {*} viewProps
 * @returns
 */
export function createErrorView(viewProps) {
  const root = document.createElement('div');
  root.className = 'dialog-container whiteframe';
  root.innerHTML = String.raw`
    <h4>Unable to load data</h4>
    <div>
      ${viewProps.error?.message || 'Unknown error'}
    </div>
    <button id="retry-btn">Retry</button>
  `;

  // Select the retry button and add an event listener to it.
  // This will call the onRetry function passed in the viewProps object.
  const retryButton = root.querySelector('#retry-btn');
  retryButton.addEventListener('click', viewProps.onRetry);

  return { root };
}
