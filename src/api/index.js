import axios from './config.js'

const keys = {
  'here': '3CkfUHnhXVT23nyBvr_8DME9MGnxjTMR5_8ZXkJJD1s',
  'ow': '439d4b804bc8187953eb36d2a8c26a02',
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


export function onecall(position) {
  return axios.get('https://openweathermap.org/data/2.5/onecall', {
    params: {
      lat: position.lat,
      lon: position.lng,
      units: 'metric',
      appid: keys.ow
    }
  })
}

export default {
  fetchCities,
  lookup,
  onecall,
}
