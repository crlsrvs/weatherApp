import React from 'react'
import { Container } from 'reactstrap'

import '../assets/styles/components/Container.css'

const Home = () => (
  <Container className="container">
    <h1>Welcome to the Weather Web Page</h1> <hr/>
    <p> This place collects weather data from major weather warning systems and presents them in a uniform and convenient data format.</p>
  </Container>
)

export default Home