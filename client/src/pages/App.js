import React from 'react';
import { useDispatch } from 'react-redux' 
import { Router, Switch } from "react-router-dom"
import { routes, RouteWithSubRoutes } from '../routes'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import FlashMessages from '../components/FlashMessages'
import { setAuthorizationToken } from '../services/auth'
import { setCurrentUser } from '../actions/authActions'
import history from '../history'
import jwtDecode from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch()

  // 可以看做 componentWillUnmount
  // 设置好 user 信息, 即使刷新用户信息仍然保存
  const token = localStorage.getItem('jwtToken')
  if (token) {
    // 设置 axios header
    setAuthorizationToken(token)
    // dispatch set user 的 action
    dispatch(setCurrentUser(jwtDecode(token)))
  }

  return (
    <Router history={history}>
      <NavBar />
      <FlashMessages />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>

      <Footer />
    </Router>
  )
}


export default App