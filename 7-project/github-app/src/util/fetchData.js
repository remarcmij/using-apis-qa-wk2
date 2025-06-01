/**
 * A cache for storing fetched data.
 * @type {Record<string, { data: any, headers: Headers }>}
 */
const cache = {};

/**
 * Fetches data from the provided URL.
 * @param {string} url 
 * @returns {Promise<{ data: any, headers: Headers }> }
 */
export async function fetchData(url) {
  const res = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}  ${res.statusText}`);
  }

  const data = await res.json();
  return { data, headers: res.headers };
}

/**
 * Fetches data from the cache or the server.
 * @param {string} url 
 * @returns {Promise<{ data: any, headers: Headers }> }
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

/**
 * Fetches data from a slow and unreliable server.
 * This function simulates a slow and flaky server by introducing
 * a delay and randomly failing some requests. This is just for demonstration
 * purposes. Don't use this in production code!
 * @param {string} url 
 * @returns {Promise<{ data: any, headers: Headers }> } 
 */
export async function fetchSlowAndUnreliably(url) {
  // Exaggerate the slowness of the server/network by delaying for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Exaggerate the flakiness of the server by failing some of the time
  if (Math.random() < 0.25) {
    throw new Error('Server is down');
  }

  // Fetch the data from the cache or the server
  return await fetchCached(url);
}
