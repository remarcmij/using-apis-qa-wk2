import { createNeosPage } from './pages/NeosPage.js';
import { loadPage } from './util/loadPage.js';

/**
 * Loads the application.
 */
function loadApp() {
  const state = {
    startDate: null,
    endDate: null,
    neos: null,
    totalCount: 0,
    error: null,
    loading: false,
    searchTerm: '',
    hazardFilter: 'all',
    sizeFilter: 'all',
    sortBy: 'distance',
    itemsPerPage: 10,
    currentPage: 1,
  };

  loadPage(createNeosPage, state);
}

window.addEventListener('load', loadApp);
