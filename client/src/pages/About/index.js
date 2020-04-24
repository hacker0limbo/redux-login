import React from 'react'

export default () => {
  return (
    <div className="alert alert-info about" role="alert">
      <h1 className="alert-heading">About</h1>
      <p><em>You might not need redux - Dan Abramov</em></p>
      <hr />
      <p className="mb-0">
        This page is hidden by default, only logged in user can access this page
      </p>
    </div>
  )
}