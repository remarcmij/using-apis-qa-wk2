/**
 * Formats a date to YYYY-MM-DD format for the NASA API.
 * @param {Date} date
 * @returns {string}
 */
export function formatDateForAPI(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Gets the current date as a string in YYYY-MM-DD format.
 * @returns {string}
 */
export function getCurrentDate() {
  return formatDateForAPI(new Date());
}

/**
 * Gets a date that is a specified number of days from today.
 * @param {number} daysOffset - Number of days from today (negative for past dates)
 * @returns {string}
 */
export function getDateWithOffset(daysOffset) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return formatDateForAPI(date);
}

/**
 * Formats a date string to a more readable format.
 * @param {string} dateString
 * @returns {string}
 */
export function formatDateReadable(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Gets a relative time description (e.g., "in 3 days", "yesterday").
 * @param {string} dateString
 * @returns {string}
 */
export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;

  return dateString;
}

/**
 * Formats a number to include commas for thousands.
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Formats distance in kilometers to a readable format.
 * @param {number} distance
 * @returns {string}
 */
export function formatDistance(distance) {
  if (distance > 1000000) {
    return `${(distance / 1000000).toFixed(2)} million km`;
  } else if (distance > 1000) {
    return `${(distance / 1000).toFixed(0)} thousand km`;
  }
  return `${Math.round(distance)} km`;
}

/**
 * Formats diameter in kilometers to a readable format.
 * @param {number} diameterMin
 * @param {number} diameterMax
 * @returns {string}
 */
export function formatDiameter(diameterMin, diameterMax) {
  const min =
    diameterMin < 1
      ? `${(diameterMin * 1000).toFixed(0)}m`
      : `${diameterMin.toFixed(2)}km`;
  const max =
    diameterMax < 1
      ? `${(diameterMax * 1000).toFixed(0)}m`
      : `${diameterMax.toFixed(2)}km`;
  return `${min} - ${max}`;
}

/**
 * Formats velocity in km/h to a readable format.
 * @param {number} velocity
 * @returns {string}
 */
export function formatVelocity(velocity) {
  return `${Math.round(velocity).toLocaleString()} km/h`;
}
