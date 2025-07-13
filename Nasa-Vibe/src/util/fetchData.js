import { NASA_API_KEY } from '../config.js';

/**
 * A cache for storing fetched data.
 * @type {Record<string, { data: any, headers: Headers }>}
 */
const cache = {};

/**
 * Fetches data from the NASA API.
 * @param {string} url
 * @returns {Promise<{ data: any, headers: Headers }>}
 */
export async function fetchData(url) {
  // Add API key to URL
  const urlWithKey = new URL(url);
  urlWithKey.searchParams.set('api_key', NASA_API_KEY);

  const res = await fetch(urlWithKey.toString(), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return { data, headers: res.headers };
}

/**
 * Fetches data from the cache or the server.
 * @param {string} url
 * @returns {Promise<{ data: any, headers: Headers }>}
 */
export async function fetchCached(url) {
  let cacheItem = cache[url];
  if (cacheItem) {
    return cacheItem;
  }

  cacheItem = await fetchData(url);
  cache[url] = cacheItem;

  return cacheItem;
}
