import React from 'react'
import { addAndDeleteFlashMessage } from '../../actions/flashMessageActions'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authSelector } from '../../selectors/authenticationSelectors'

const WithAuthentication = WrappedComponent =>
  function Comp(props) {
    const isAuthenticated = useSelector(authSelector)
    const dispatch = useDispatch()
    
    if (isAuthenticated) {
      return <WrappedComponent {...props} />
    } else {
      dispatch(addAndDeleteFlashMessage({
        type: 'danger',
        text: 'You need to login to access this page!'
      }))
      return <Redirect to="/login" />
    }
  }


export default WithAuthentication