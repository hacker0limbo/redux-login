import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authSelector, userSelector } from '../selectors/authenticationSelectors'
import { logoutRequest } from '../actions/logoutActions'

const NavBar = () => {
  const isAuthenticated = useSelector(authSelector)
  const user = useSelector(userSelector)
  const dispatch = useDispatch()

  const logout = e => {
    dispatch(logoutRequest(user))
  }

  const guestLinks = (
    <React.Fragment>
      <NavLink className="nav-link" to="/login">Login</NavLink>
      <NavLink className="nav-link" to="/signup">Signup</NavLink>
    </React.Fragment>
  )

  const userLinks = (
    <React.Fragment>
      <NavLink onClick={logout} className="nav-link" to="/logout">Logout</NavLink>
      <NavLink className="nav-link" to="/about">About</NavLink>
      <NavLink className="nav-link" to="/profile">Profile</NavLink>
    </React.Fragment>
  )

  return (
    <div className="masthead my-3 d-flex justify-content-around">
      <h3 className="masthead-brand">Redux Login</h3>
      <nav className="nav nav-masthead justify-content-center">
        <NavLink exact className="nav-link" to="/">Home</NavLink>
        {isAuthenticated ? userLinks : guestLinks}
      </nav>
    </div>
  )
}

export default NavBar