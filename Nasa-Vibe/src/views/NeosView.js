import { formatDistance, formatDiameter, formatVelocity, formatNumber } from '../util/formatters.js';

/**
 * Creates the NEOs view.
 * @param {object} props - Component props
 * @param {function} props.onDateRangeChange - Date range change handler
 * @param {function} props.onFilterChange - Filter change handler
 * @returns {object} View object with root element and update function
 */
export function createNeosView(props) {
  const root = document.createElement('div');
  root.className = 'neos-page';

  root.innerHTML = String.raw`
    <div class="search-section">
      <h3 class="search-title">🔍 Search Near Earth Objects</h3>
      <input 
        type="text" 
        id="search-box" 
        class="search-box" 
        placeholder="Search by name, ID, or any property..."
      />
    </div>

    <div class="quick-actions">
      <button class="quick-action-btn" data-preset="today">📅 Today</button>
      <button class="quick-action-btn" data-preset="week">📅 This Week</button>
      <button class="quick-action-btn" data-preset="hazardous">⚠️ Hazardous Only</button>
      <button class="quick-action-btn" data-preset="large">🔭 Large Objects</button>
      <button class="quick-action-btn" id="refresh-btn">🔄 Refresh</button>
    </div>

    <div class="date-picker-section">
      <h2 class="date-picker-title">🗓️ Select Date Range</h2>
      <div class="date-controls">
        <div class="date-group">
          <label for="start-date">Start Date</label>
          <input type="date" id="start-date" />
        </div>
        <div class="date-group">
          <label for="end-date">End Date</label>
          <input type="date" id="end-date" />
        </div>
        <button class="btn btn-primary fetch-btn">Explore NEOs</button>
      </div>
    </div>

    <div class="filters-section">
      <h3 class="filters-title">🔍 Filters & Sorting</h3>
      <div class="filters-grid">
        <div class="filter-group">
          <label for="hazard-filter">Hazard Level</label>
          <select id="hazard-filter">
            <option value="all">All Objects</option>
            <option value="hazardous">Potentially Hazardous</option>
            <option value="safe">Safe</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="size-filter">Size Category</label>
          <select id="size-filter">
            <option value="all">All Sizes</option>
            <option value="small">Small (&lt;100m)</option>
            <option value="medium">Medium (100m-1km)</option>
            <option value="large">Large (&gt;1km)</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="sort-filter">Sort By</label>
          <select id="sort-filter">
            <option value="distance">Closest Distance</option>
            <option value="size">Size (Largest First)</option>
            <option value="velocity">Velocity (Fastest First)</option>
            <option value="name">Name (A-Z)</option>
            <option value="date">Approach Date</option>
            <option value="magnitude">Brightness</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="items-per-page">Items Per Page</label>
          <select id="items-per-page">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">All</option>
          </select>
        </div>
      </div>
    </div>

    <div class="stats-section hidden">
      <div class="stat-card">
        <span class="stat-number total-count">0</span>
        <span class="stat-label">Total Objects</span>
      </div>
      <div class="stat-card">
        <span class="stat-number hazardous-count">0</span>
        <span class="stat-label">Potentially Hazardous</span>
      </div>
      <div class="stat-card">
        <span class="stat-number closest-distance">-</span>
        <span class="stat-label">Closest Approach</span>
      </div>
      <div class="stat-card">
        <span class="stat-number largest-size">-</span>
        <span class="stat-label">Largest Object</span>
      </div>
      <div class="stat-card">
        <span class="stat-number avg-velocity">-</span>
        <span class="stat-label">Avg Velocity</span>
      </div>
      <div class="stat-card">
        <span class="stat-number date-range">-</span>
        <span class="stat-label">Date Range</span>
      </div>
    </div>

    <div class="loading hidden">
      <div class="spinner"></div>
      <div class="loading-text">Fetching NEO data from NASA...</div>
    </div>

    <div class="neo-list-container">
      <div class="neo-list"></div>
      <div class="pagination hidden">
        <button class="pagination-btn" id="prev-btn" disabled>← Previous</button>
        <span class="pagination-info">Page 1 of 1</span>
        <button class="pagination-btn" id="next-btn" disabled>Next →</button>
      </div>
    </div>
  `;

  // Get references to elements
  const searchBox = root.querySelector('#search-box');
  const quickActionBtns = root.querySelectorAll('.quick-action-btn[data-preset]');
  const refreshBtn = root.querySelector('#refresh-btn');
  const startDateInput = root.querySelector('#start-date');
  const endDateInput = root.querySelector('#end-date');
  const fetchBtn = root.querySelector('.fetch-btn');
  const hazardFilter = root.querySelector('#hazard-filter');
  const sizeFilter = root.querySelector('#size-filter');
  const sortFilter = root.querySelector('#sort-filter');
  const itemsPerPageSelect = root.querySelector('#items-per-page');
  const statsSection = root.querySelector('.stats-section');
  const loadingDiv = root.querySelector('.loading');
  const neoList = root.querySelector('.neo-list');
  const pagination = root.querySelector('.pagination');
  const prevBtn = root.querySelector('#prev-btn');
  const nextBtn = root.querySelector('#next-btn');
  const paginationInfo = root.querySelector('.pagination-info');

  // Event listeners
  let searchTimeout;
  searchBox.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      props.onFilterChange('searchTerm', e.target.value);
    }, 300);
  });

  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const preset = e.target.dataset.preset;
      // Remove active class from all buttons
      quickActionBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      e.target.classList.add('active');
      
      const today = new Date();
      let startDate, endDate;
      
      switch (preset) {
        case 'today':
          startDate = endDate = today.toISOString().split('T')[0];
          break;
        case 'week':
          startDate = today.toISOString().split('T')[0];
          const weekEnd = new Date(today);
          weekEnd.setDate(weekEnd.getDate() + 6);
          endDate = weekEnd.toISOString().split('T')[0];
          break;
        case 'hazardous':
          props.onFilterChange('hazardFilter', 'hazardous');
          return;
        case 'large':
          props.onFilterChange('sizeFilter', 'large');
          return;
      }
      
      if (startDate && endDate) {
        startDateInput.value = startDate;
        endDateInput.value = endDate;
        props.onDateRangeChange(startDate, endDate);
      }
    });
  });

  refreshBtn.addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (startDate && endDate) {
      props.onDateRangeChange(startDate, endDate);
    }
  });

  fetchBtn.addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
      alert('End date must be after start date.');
      return;
    }
    
    // NASA API allows max 7 days
    const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (daysDiff > 7) {
      alert('Date range cannot exceed 7 days due to NASA API limitations.');
      return;
    }
    
    props.onDateRangeChange(startDate, endDate);
  });

  hazardFilter.addEventListener('change', (e) => {
    props.onFilterChange('hazardFilter', e.target.value);
  });

  sizeFilter.addEventListener('change', (e) => {
    props.onFilterChange('sizeFilter', e.target.value);
  });

  sortFilter.addEventListener('change', (e) => {
    props.onFilterChange('sortBy', e.target.value);
  });

  itemsPerPageSelect.addEventListener('change', (e) => {
    props.onFilterChange('itemsPerPage', parseInt(e.target.value));
  });

  prevBtn.addEventListener('click', () => {
    props.onFilterChange('currentPage', (props.currentPage || 1) - 1);
  });

  nextBtn.addEventListener('click', () => {
    props.onFilterChange('currentPage', (props.currentPage || 1) + 1);
  });

  /**
   * Filters and sorts the NEO data based on current filters.
   * @param {Array} neos - Array of NEO objects
   * @param {object} state - Current state
   * @returns {Array} Filtered and sorted array
   */
  function filterAndSortNeos(neos, state) {
    let filtered = [...neos];

    // Apply search filter
    if (state.searchTerm && state.searchTerm.trim()) {
      const searchTerm = state.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(neo => {
        return neo.name.toLowerCase().includes(searchTerm) ||
               neo.id.includes(searchTerm) ||
               neo.close_approach_data[0].close_approach_date.includes(searchTerm) ||
               neo.close_approach_data[0].orbiting_body.toLowerCase().includes(searchTerm);
      });
    }

    // Apply hazard filter
    if (state.hazardFilter === 'hazardous') {
      filtered = filtered.filter(neo => neo.is_potentially_hazardous_asteroid);
    } else if (state.hazardFilter === 'safe') {
      filtered = filtered.filter(neo => !neo.is_potentially_hazardous_asteroid);
    }

    // Apply size filter
    if (state.sizeFilter !== 'all') {
      filtered = filtered.filter(neo => {
        const diameter = neo.estimated_diameter.kilometers.estimated_diameter_max;
        switch (state.sizeFilter) {
          case 'small': return diameter < 0.1;
          case 'medium': return diameter >= 0.1 && diameter <= 1;
          case 'large': return diameter > 1;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aApproach = a.close_approach_data[0];
      const bApproach = b.close_approach_data[0];
      
      switch (state.sortBy) {
        case 'distance':
          return parseFloat(aApproach.miss_distance.kilometers) - parseFloat(bApproach.miss_distance.kilometers);
        case 'size':
          return b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max;
        case 'velocity':
          return parseFloat(bApproach.relative_velocity.kilometers_per_hour) - parseFloat(aApproach.relative_velocity.kilometers_per_hour);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(aApproach.close_approach_date) - new Date(bApproach.close_approach_date);
        case 'magnitude':
          return a.absolute_magnitude_h - b.absolute_magnitude_h;
        default:
          return 0;
      }
    });

    return filtered;
  }

  /**
   * Creates HTML for a single NEO card.
   * @param {object} neo - NEO object
   * @returns {string} HTML string
   */
  function createNeoCard(neo) {
    const approach = neo.close_approach_data[0];
    const diameter = neo.estimated_diameter.kilometers;
    const isHazardous = neo.is_potentially_hazardous_asteroid;
    const isLarge = diameter.estimated_diameter_max > 1;
    const isFast = parseFloat(approach.relative_velocity.kilometers_per_hour) > 50000;

    // Create NASA JPL URL
    const jplUrl = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${neo.id}`;
    
    // Determine card classes
    let cardClasses = 'neo-card';
    if (isHazardous) cardClasses += ' hazardous';
    if (isLarge) cardClasses += ' large-object';
    if (isFast) cardClasses += ' fast-object';

    return String.raw`
      <div class="${cardClasses}">
        <div class="neo-header">
          <div>
            <h3 class="neo-name">${neo.name}</h3>
            <div class="neo-id">ID: ${neo.id}</div>
          </div>
          <div class="${isHazardous ? 'hazard-badge' : 'safe-badge'}">
            ${isHazardous ? '⚠️ Hazardous' : '✅ Safe'}
          </div>
        </div>
        
        <div class="neo-details">
          <div class="detail-group">
            <div class="detail-label">Approach Date</div>
            <div class="detail-value">${approach.close_approach_date}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Miss Distance</div>
            <div class="detail-value">${formatDistance(parseFloat(approach.miss_distance.kilometers))}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Diameter</div>
            <div class="detail-value">${formatDiameter(diameter.estimated_diameter_min, diameter.estimated_diameter_max)}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Velocity</div>
            <div class="detail-value">${formatVelocity(parseFloat(approach.relative_velocity.kilometers_per_hour))}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Orbiting Body</div>
            <div class="detail-value">${approach.orbiting_body}</div>
          </div>
          
          <div class="detail-group">
            <div class="detail-label">Absolute Magnitude</div>
            <div class="detail-value tooltip" data-tooltip="Brightness measurement - lower is brighter">
              ${neo.absolute_magnitude_h.toFixed(2)}
            </div>
          </div>
        </div>

        <div class="external-links">
          <a href="${jplUrl}" target="_blank" rel="noopener noreferrer" class="external-link">
            🔗 View on NASA JPL
          </a>
          <button class="external-link" onclick="navigator.share && navigator.share({title: '${neo.name}', text: 'Check out this asteroid: ${neo.name}', url: '${jplUrl}'}).catch(e => console.log('Share failed'))">
            📤 Share
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Updates the statistics section.
   * @param {Array} neos - Array of NEO objects
   */
  function updateStats(neos) {
    const totalCount = neos.length;
    const hazardousCount = neos.filter(neo => neo.is_potentially_hazardous_asteroid).length;
    
    let closestDistance = Infinity;
    let largestSize = 0;
    let totalVelocity = 0;
    
    neos.forEach(neo => {
      const distance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
      const size = neo.estimated_diameter.kilometers.estimated_diameter_max;
      const velocity = parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour);
      
      if (distance < closestDistance) {
        closestDistance = distance;
      }
      if (size > largestSize) {
        largestSize = size;
      }
      totalVelocity += velocity;
    });

    const avgVelocity = totalCount > 0 ? totalVelocity / totalCount : 0;

    root.querySelector('.total-count').textContent = formatNumber(totalCount);
    root.querySelector('.hazardous-count').textContent = formatNumber(hazardousCount);
    root.querySelector('.closest-distance').textContent = closestDistance === Infinity ? '-' : formatDistance(closestDistance);
    root.querySelector('.largest-size').textContent = largestSize === 0 ? '-' : formatDiameter(largestSize, largestSize);
    root.querySelector('.avg-velocity').textContent = avgVelocity === 0 ? '-' : formatVelocity(avgVelocity);
    
    // Update date range display
    const dateRangeElement = root.querySelector('.date-range');
    if (startDateInput.value && endDateInput.value) {
      const start = new Date(startDateInput.value).toLocaleDateString();
      const end = new Date(endDateInput.value).toLocaleDateString();
      dateRangeElement.textContent = start === end ? start : `${start} - ${end}`;
    } else {
      dateRangeElement.textContent = '-';
    }
  }

  function updatePagination(filteredNeos, state) {
    const itemsPerPage = state.itemsPerPage || 10;
    const currentPage = state.currentPage || 1;
    const totalPages = itemsPerPage === 100 ? 1 : Math.ceil(filteredNeos.length / itemsPerPage);
    
    // Update pagination info
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    
    // Show/hide pagination
    if (totalPages > 1) {
      pagination.classList.remove('hidden');
    } else {
      pagination.classList.add('hidden');
    }
    
    // Return paginated data
    if (itemsPerPage === 100) {
      return filteredNeos;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNeos.slice(startIndex, endIndex);
  }

  const update = (state) => {
    // Update date inputs
    if (state.startDate) startDateInput.value = state.startDate;
    if (state.endDate) endDateInput.value = state.endDate;

    // Update search box
    if (state.searchTerm !== undefined) searchBox.value = state.searchTerm || '';

    // Update filter values
    if (state.hazardFilter) hazardFilter.value = state.hazardFilter;
    if (state.sizeFilter) sizeFilter.value = state.sizeFilter;
    if (state.sortBy) sortFilter.value = state.sortBy;
    if (state.itemsPerPage) itemsPerPageSelect.value = state.itemsPerPage;

    // Show/hide loading
    if (state.loading) {
      loadingDiv.classList.remove('hidden');
      statsSection.classList.add('hidden');
      neoList.innerHTML = '';
      pagination.classList.add('hidden');
    } else {
      loadingDiv.classList.add('hidden');
    }

    // Update NEO list
    if (state.neos && !state.loading) {
      const filteredNeos = filterAndSortNeos(state.neos, state);
      
      // Update stats
      updateStats(filteredNeos);
      statsSection.classList.remove('hidden');

      // Update pagination and get paginated data
      const paginatedNeos = updatePagination(filteredNeos, state);

      // Update list
      if (filteredNeos.length === 0) {
        neoList.innerHTML = String.raw`
          <div class="error-container">
            <div class="error-icon">🔍</div>
            <h3 class="error-title">No Objects Found</h3>
            <p class="error-message">
              No near-Earth objects match your current filters for the selected date range.
              Try adjusting your filters or selecting a different date range.
            </p>
          </div>
        `;
        pagination.classList.add('hidden');
      } else {
        neoList.innerHTML = paginatedNeos.map(createNeoCard).join('');
      }
    }
  };

  return { root, update };
}
