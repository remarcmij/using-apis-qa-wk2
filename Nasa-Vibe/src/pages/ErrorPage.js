import { createErrorView } from '../views/ErrorView.js';

/**
 * Creates the Error page.
 * @param {object} state - The application state
 * @returns {object} Page object with root element
 */
export function createErrorPage(state) {
  const onRetry = () => {
    // Reload the page to start fresh
    window.location.reload();
  };

  const errorView = createErrorView({ onRetry });

  // Update the view with the current error state
  errorView.update(state);

  return errorView;
}
