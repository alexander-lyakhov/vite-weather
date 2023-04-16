import axios from './config.js';

const keys = {
  'here': '3CkfUHnhXVT23nyBvr_8DME9MGnxjTMR5_8ZXkJJD1s'
}

export function fetchCities(query) {
  return axios.get('https://autocomplete.search.hereapi.com/v1/autocomplete', {
    params: {
      q: encodeURIComponent(query),
      limit: 10,
      apiKey: keys.here
    }
  })
}

export function lookup(id) {
  return axios.get('https://geocode.search.hereapi.com/v1/lookup', {
    params: {
      id,
      limit: 10,
      apiKey: keys.here
    }
  })
}

export default {
  fetchCities,
  lookup,
}
