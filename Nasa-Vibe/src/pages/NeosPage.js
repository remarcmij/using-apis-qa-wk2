import { NASA_API_BASE_URL } from '../constants.js';
import { fetchData } from '../util/fetchData.js';
import { getCurrentDate, getDateWithOffset } from '../util/formatters.js';
import { loadPage } from '../util/loadPage.js';
import { createNeosView } from '../views/NeosView.js';
import { createErrorPage } from './ErrorPage.js';

/**
 * Creates the NEOs page.
 * @param {object} state - The application state
 * @returns {object} Page object with root element
 */
export function createNeosPage(state) {
  const onDateRangeChange = async (startDate, endDate) => {
    try {
      // Update state to show loading
      state = { ...state, loading: true, error: null };
      neosView.update(state);

      // Fetch NEO data for the date range
      const url = `${NASA_API_BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}`;
      const { data } = await fetchData(url);

      // Process the data to create a flat list of NEOs with their dates
      const neos = [];
      Object.keys(data.near_earth_objects).forEach((date) => {
        data.near_earth_objects[date].forEach((neo) => {
          neos.push({
            ...neo,
            approach_date: date,
          });
        });
      });

      // Update state with fetched data - ensure loading is false
      state = {
        ...state,
        loading: false,
        error: null,
        neos,
        totalCount: data.element_count,
        startDate,
        endDate,
        currentPage: 1, // Reset to first page when new data is loaded
      };

      // Force view update with the new state
      neosView.update(state);
    } catch (error) {
      console.error('Error fetching NEO data:', error);
      state = { ...state, error, loading: false };
      loadPage(createErrorPage, state);
    }
  };

  const onFilterChange = (filterType, value) => {
    if (filterType === 'currentPage') {
      state = { ...state, currentPage: value };
    } else if (filterType === 'itemsPerPage') {
      state = { ...state, itemsPerPage: value, currentPage: 1 }; // Reset to first page
    } else {
      state = { ...state, [filterType]: value, currentPage: 1 }; // Reset to first page on filter change
    }
    neosView.update(state);
  };

  const neosView = createNeosView({
    onDateRangeChange,
    onFilterChange,
  });

  // Load initial data for the current week
  const startDate = getCurrentDate();
  const endDate = getDateWithOffset(6); // 7 days from start (NASA API max)

  // Set initial state
  state = {
    ...state,
    startDate,
    endDate,
    searchTerm: '',
    hazardFilter: 'all',
    sizeFilter: 'all',
    sortBy: 'distance',
    itemsPerPage: 10,
    currentPage: 1,
  };

  // Load initial data
  onDateRangeChange(startDate, endDate);

  return neosView;
}
