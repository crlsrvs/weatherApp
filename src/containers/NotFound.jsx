import React from 'react'
import logo from '../assets/icons/page-not-found.png'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

import '../assets/styles/components/Container.css'

const NotFound = () => (
  <Container className="container">
    <img src={logo} alt="logo" />
    <h2>Website not found</h2>
    <h3>Why don't you check if it's raining <Link to="/weather">here</Link>?</h3>
  </Container>
)

export default NotFound