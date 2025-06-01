import { loadPage } from '../util/loadPage.js';
import { createErrorView } from '../views/ErrorView.js';
import { createReposPage } from './ReposPage.js';

export function createErrorPage(state) {
  const onRetry = () => {
    loadPage(createReposPage, state);
  };

  const viewProps = {
    error: state.error,
    onRetry,
  };

  return createErrorView(viewProps);
}
