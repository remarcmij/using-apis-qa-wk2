import { API_BASE_URL } from '../constants.js';
import { fetchSlowAndUnreliably } from '../util/fetchData.js';
import { loadPage } from '../util/loadPage.js';
import { createReposView } from '../views/ReposView.js';
import { createErrorPage } from './ErrorPage.js';

export function createReposPage(state) {
  // Event handlers: These functions respond to user interactions
  // They update the application state and trigger a re-render

  // Handler for the organization change event.
  const onOrganizationChange = (e) => {
    // When user selects a different organization, reset to page 1
    // and fetch new data
    state = { ...state, organization: e.target.value, page: 1 };
    update();
  };

  // Handler for the next page button click event.
  const onNextPage = () => {
    state = { ...state, page: state.page + 1 };
    update();
  };

  // Handler for the previous page button click event.
  const onPrevPage = () => {
    state = { ...state, page: state.page - 1 };
    update();
  };

  // Pass the event handlers to the View using the viewProps object.
  const viewProps = {
    onOrganizationChange,
    onNextPage,
    onPrevPage,
  };

  // Create the View, passing the viewProps object.
  const reposView = createReposView(viewProps);

  // Internal update function: Fetches data and updates the view
  // This demonstrates the typical API call pattern:
  // 1. Set loading state
  // 2. Make API request
  // 3. Handle success/error
  // 4. Update UI with results
  const update = async () => {
    try {
      // Update the View so that a loading indicator is shown while
      // data is being fetched.
      state = { ...state, error: null, loading: true, data: null };
      reposView.update(state);

      // Fetch the data from the API using the current organization and page.
      const url = `${API_BASE_URL}/orgs/${state.organization}/repos?per_page=5&page=${state.page}`;
      const { data, headers } = await fetchSlowAndUnreliably(url);

      // Check whether the response indicates there is a next and/or a prev page to go to
      const linkItems = headers.get('Link').split(',');
      const prevItem = linkItems.find((item) => item.endsWith('rel="prev"'));
      const nextItem = linkItems.find((item) => item.endsWith('rel="next"'));

      // Update the View to hide the loading indicator and update its HTML
      // content with the fetched data.
      state = {
        ...state,
        data,
        loading: false,
        hasPrev: !!prevItem,
        hasNext: !!nextItem,
      };
      reposView.update(state);
    } catch (error) {
      // Update the state with the error information and load the Error Page
      state = { ...state, error, loading: false };
      loadPage(createErrorPage, state);
    }
  };

  // Perform an initial update of the page when the page is created.
  update();

  return reposView;
}
