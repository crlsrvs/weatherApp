import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import WeatherView from '../containers/WeatherView'
import HistoricalView from '../containers/HistoricalView'
import ForecastView from '../containers/ForecastView'
import Home from '../containers/Home'
import NotFound from '../containers/NotFound'
import Layout from '../components/Layout'

function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/weather" component={WeatherView} />
        <Route exact path="/historical" component={HistoricalView} />
        <Route exact path="/forecast" component={ForecastView} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>

  )
}

export default App
