import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authSelector } from '../selectors/authenticationSelectors'
import PropTypes from 'prop-types'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import About from '../pages/About'
import Profile from '../pages/Profile'
import { addAndDeleteFlashMessage } from '../actions/flashMessageActions'
import WithAuthentication from '../components/HOCs/WithAuthentication'

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  }, {
    path: '/login',
    component: Login,
    // routes: [
    //   {
    //     path: 'a',
    //     component: A
    //   }
    // ]
  }, {
    path: '/signup',
    component: Signup,
  },{
    path: '/about',
    component: About,
    auth: true
  }, {
    path: '/profile',
    component: WithAuthentication(Profile),
    // auth: true
  },{
    path: '*',
    component: NotFound,
  },
]

export const RequireAuth = (props) => {
  // 用于渲染路由的, 渲染出 Route 或者 Redirect
  // <RequireAuth><Route path=xxx /></Require>
  const { children } = props
  const isAuthenticated = useSelector(authSelector)
  if (isAuthenticated) {
    return children
  }
  return <Redirect to="login" />
}

export const RouteWithSubRoutes = route => {
  const isAuthenticated = useSelector(authSelector)
  const dispatch = useDispatch()

  if (route.auth) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => {
          if (isAuthenticated) {
            return <route.component {...props} routes={route.routes} />
          } else {
            dispatch(addAndDeleteFlashMessage({ 
              type: 'danger', 
              text: 'You need to login to access this page' 
            }))
            return <Redirect to="login" />
          }
        }}
      />
    )
  }

  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

// https://github.com/facebook/prop-types/pull/211
RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  exact: PropTypes.bool,
  routes: PropTypes.array,
}