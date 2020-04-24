import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="jumbotron not-found">
      <h1 className="display-4">404 Nout Found</h1>
      <p className="lead">
        <em>Use whatever make sense - Dan Abramov</em>
      </p>
      <hr className="my-4" />
      <Link className="btn btn-primary btn-lg" to="/">Go Back Home</Link>
    </div>
  )
}