/**
 * Creates the Error view.
 * @param {object} props - Component props
 * @param {function} props.onRetry - Retry button click handler
 * @returns {object} View object with root element and update function
 */
export function createErrorView(props) {
  const root = document.createElement('div');
  root.className = 'error-container';

  root.innerHTML = String.raw`
    <div class="error-icon">💥</div>
    <h2 class="error-title">Oops! Something went wrong</h2>
    <p class="error-message">
      We encountered an error while fetching data from NASA's servers.
      This could be due to network issues or API rate limiting.
    </p>
    <button class="btn btn-primary retry-btn">Try Again</button>
  `;

  const retryBtn = root.querySelector('.retry-btn');
  const errorMessage = root.querySelector('.error-message');

  retryBtn.addEventListener('click', props.onRetry);

  const update = (state) => {
    if (state.error) {
      // Update error message based on the specific error
      let message =
        "We encountered an error while fetching data from NASA's servers.";

      if (state.error.message.includes('404')) {
        message =
          'No data found for the selected date range. Try selecting different dates.';
      } else if (
        state.error.message.includes('403') ||
        state.error.message.includes('429')
      ) {
        message =
          'API rate limit exceeded. Please wait a moment and try again, or consider using your own NASA API key.';
      } else if (state.error.message.includes('Failed to fetch')) {
        message =
          'Network connection error. Please check your internet connection and try again.';
      }

      errorMessage.textContent = message;
    }
  };

  return { root, update };
}
