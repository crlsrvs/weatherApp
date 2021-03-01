import invokeService from '../../utils/invokeGetService'

import {URL_BASE, API_WEATHER, ENDPOINT_CURRENT, ENDPOINT_HISTORICAL, ENDPOINT_FORECAST} from './config'


const getCurrentWeatherData = async (params) => {

  const url = new URL(`${URL_BASE}${API_WEATHER}${ENDPOINT_CURRENT}`)

  url.search = new URLSearchParams(params).toString()

  return invokeService( url )
}

const getHistoricalData = async (params) => {

  const url = new URL(`${URL_BASE}${API_WEATHER}${ENDPOINT_HISTORICAL}`)

  url.search = new URLSearchParams(params).toString()

  return invokeService( url )
}

const getForecastData = async (params) => {

  const url = new URL(`${URL_BASE}${API_WEATHER}${ENDPOINT_FORECAST}`)

  url.search = new URLSearchParams(params).toString()

  return invokeService( url )
}

export { getCurrentWeatherData, getHistoricalData, getForecastData }
