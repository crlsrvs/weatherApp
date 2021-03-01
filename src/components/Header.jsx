
import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap'

import logo from '../assets/icons/icon-climate-change-01-300x300.png'

const logoStyle = {height: 35}


const Header = () => {
  return(
    <Navbar color="light" light expand="md">

      <Link  to="/" className="navbar-brand">
        <img style={logoStyle} src={logo} alt="logo" />
      </Link>

      <Nav className="mr-auto" navbar>

        <NavItem>
          <Link to="/weather" activeStyle={{ fontWeight: "bold" }} className="nav-link" >
            Current Weather
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/historical" activeStyle={{ fontWeight: "bold" }} className="nav-link">
            Historical Information
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/forecast" activeStyle={{ fontWeight: "bold" }} className="nav-link">
            Forecast
          </Link>
        </NavItem>

      </Nav>

      <NavbarText>
        <NavLink>
          FullStack Test
        </NavLink>
      </NavbarText>
    </Navbar>
  )

}

export default Header