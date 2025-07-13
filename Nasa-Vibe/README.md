# Nasa Vibe - Near Earth Objects Explorer

A vanilla JavaScript web application that explores Near Earth Objects (NEOs) using NASA's Neo-Feed API. Built following the Page/View/State Model architecture pattern.

## Features

### Core Functionality
- **Date Range Selection**: Explore NEOs for any 7-day period (NASA API limitation)
- **Real-time Data**: Fetches live data from NASA's Near Earth Object Web Service (NeoWs)
- **Search Functionality**: Search by asteroid name, ID, approach date, or orbiting body
- **Smart Filtering**: Filter by hazard level, size category, and sort by various criteria
- **Pagination**: Handle large datasets with configurable items per page

### User Interface
- **Beautiful UI**: Modern space-themed dark design with responsive layout
- **Quick Actions**: Preset buttons for common searches (Today, This Week, Hazardous Only, Large Objects)
- **Statistics Dashboard**: View comprehensive statistics about discovered objects
- **Interactive Cards**: Hover effects and visual categorization of objects
- **External Links**: Direct links to NASA JPL database for detailed information

### Technical Features
- **Error Handling**: Graceful handling of API errors and network issues
- **Loading States**: Visual feedback during data fetching
- **Local Storage**: Remembers user preferences (planned feature)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Print Friendly**: Optimized print styles for reports

## Quick Setup

### 1. API Key Configuration

The application requires a NASA API key for optimal performance:

1. Copy the template config file:
   ```bash
   cp src/config.template.js src/config.js
   ```

2. Edit `src/config.js` and replace `DEMO_KEY` with your NASA API key:
   ```javascript
   export const NASA_API_KEY = 'your-api-key-here';
   ```

3. Get a free API key from [NASA's API portal](https://api.nasa.gov/)

### 2. Running the Application

1. Open `index.html` in your web browser
2. The app will load with the current week selected by default
3. Use the date picker to select your desired date range (max 7 days)
4. Click "Explore NEOs" to fetch data
5. Use filters and search to refine your view

## Architecture

This application follows the **Page/View/State Model** architecture:

```
public/
├── style.css          # Styling and responsive design
src/
├── pages/            # Page components (business logic & event handling)
│   ├── NeosPage.js   # Main NEO exploration page
│   └── ErrorPage.js  # Error handling page
├── views/            # View components (DOM manipulation & rendering)
│   ├── NeosView.js   # Main interface rendering
│   └── ErrorView.js  # Error display rendering
├── util/             # Utility functions
│   ├── fetchData.js  # API communication
│   ├── loadPage.js   # Page loading and DOM mounting
│   └── formatters.js # Data formatting functions
├── app.js            # Application entry point
├── constants.js      # Configuration constants
├── config.js         # API keys (git-ignored)
└── config.template.js # Template for API configuration
index.html            # Main HTML file
```

### State Management

The application state includes:

- `startDate`, `endDate`: Selected date range
- `neos`: Array of fetched Near Earth Objects
- `searchTerm`: Current search query
- `hazardFilter`, `sizeFilter`, `sortBy`: Current filter settings
- `itemsPerPage`, `currentPage`: Pagination settings
- `loading`: Loading state indicator
- `error`: Error information if requests fail

## Data Displayed

For each Near Earth Object, the application shows:

### Basic Information
- **Name and ID**: Official designation and NASA catalog ID
- **Hazard Status**: Whether the object is potentially hazardous
- **Approach Date**: When the object will be closest to Earth

### Physical Properties
- **Diameter**: Estimated size range of the object
- **Absolute Magnitude**: Brightness measurement (with tooltip explanation)

### Orbital Data
- **Miss Distance**: How close the object will come to Earth
- **Velocity**: Speed relative to Earth
- **Orbiting Body**: Which celestial body the object orbits

### External Resources
- **NASA JPL Link**: Direct link to detailed NASA database entry
- **Share Function**: Native share API integration where supported

## Advanced Features

### Search and Filtering

#### Global Search
Search across multiple fields simultaneously:
- Asteroid names and designations
- NASA catalog IDs
- Approach dates
- Orbiting bodies

#### Filter Options
- **Hazard Level**: All Objects, Potentially Hazardous, Safe
- **Size Category**: All Sizes, Small (<100m), Medium (100m-1km), Large (>1km)
- **Sort Options**: Distance, Size, Velocity, Name, Approach Date, Brightness

#### Quick Actions
- **Today**: Show objects approaching today
- **This Week**: Default 7-day view
- **Hazardous Only**: Filter to potentially hazardous objects
- **Large Objects**: Show only objects larger than 1km
- **Refresh**: Reload current data

### Visual Enhancements

#### Card Categorization
- **Green accent**: Safe objects
- **Red accent**: Potentially hazardous objects
- **Purple accent**: Large objects (>1km diameter)
- **Orange accent**: Fast-moving objects (>50,000 km/h)

#### Interactive Elements
- **Hover effects**: Enhanced visual feedback
- **Tooltips**: Contextual help for technical terms
- **Animations**: Smooth transitions and loading states

### Statistics Dashboard

Real-time statistics include:
- **Total Objects**: Count of objects in current view
- **Potentially Hazardous**: Count of hazardous objects
- **Closest Approach**: Distance of nearest object
- **Largest Object**: Size of biggest object
- **Average Velocity**: Mean velocity of all objects
- **Date Range**: Currently selected time period

### Pagination and Performance

- **Configurable Page Size**: 10, 25, 50, or all items
- **Smart Pagination**: Automatic hide when not needed
- **Efficient Rendering**: Only render visible items
- **Responsive Controls**: Touch-friendly navigation

## Browser Compatibility

- Chrome/Edge 61+
- Firefox 60+
- Safari 10.1+
- Modern mobile browsers

## NASA API Information

This application uses NASA's Near Earth Object Web Service (NeoWs) API:

- **Base URL**: https://api.nasa.gov/neo/rest/v1
- **Rate Limits**: 1000 requests per hour with API key, 30 per hour without
- **Date Range**: Maximum 7 days per request
- **Data Source**: JPL's Small-Body Database

## Development

### File Structure Explained

#### Pages (`src/pages/`)
Handle business logic and event management:
- `NeosPage.js`: Main page with data fetching and state management
- `ErrorPage.js`: Error handling and retry functionality

#### Views (`src/views/`)
Handle DOM manipulation and rendering:
- `NeosView.js`: Complete UI rendering with filters, search, and pagination
- `ErrorView.js`: Error message display with context-specific messaging

#### Utilities (`src/util/`)
Provide reusable functionality:
- `fetchData.js`: NASA API communication with caching
- `loadPage.js`: Page mounting and lifecycle management
- `formatters.js`: Data formatting for display

### Adding New Features

#### New Filter Types
1. Add UI elements in `NeosView.js`
2. Extend `filterAndSortNeos()` function
3. Update state management in `NeosPage.js`

#### Additional Data Fields
1. Modify NEO card template in `createNeoCard()`
2. Add corresponding CSS styles
3. Update formatters if needed

#### New API Endpoints
1. Update constants in `constants.js`
2. Modify `fetchData.js` for new endpoints
3. Adjust data processing in page components

### Performance Considerations

- **Caching**: API responses are cached to reduce redundant requests
- **Debounced Search**: Search input is debounced to prevent excessive filtering
- **Pagination**: Large datasets are paginated for better performance
- **Efficient DOM Updates**: Minimal DOM manipulation using targeted updates

## Troubleshooting

### Common Issues

#### API Rate Limiting
- **Symptom**: 429 error responses
- **Solution**: Use your own NASA API key or wait for rate limit reset

#### Date Range Errors
- **Symptom**: No data returned
- **Solution**: Ensure date range doesn't exceed 7 days and dates are valid

#### Search Not Working
- **Symptom**: Search doesn't filter results
- **Solution**: Check that data is loaded before searching

### Configuration Issues

#### Missing API Key
- **Symptom**: App uses DEMO_KEY with limited requests
- **Solution**: Follow setup instructions to configure your API key

#### CORS Errors
- **Symptom**: Network errors in browser console
- **Solution**: NASA API supports CORS; check network connectivity

## License

This project is for educational purposes. NASA data is in the public domain.

## Acknowledgments

- **NASA**: For providing the comprehensive Near Earth Object Web Service
- **HackYourFuture**: For the architectural patterns and educational framework
- **MDN Web Docs**: For excellent JavaScript and Web API documentation
