import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types';

const FlashMessage = props => {
  const { message, deleteFlashMessage } = props
  return (
    <div className={classNames('alert alert-dismissible fade show', {
      'alert-success': message.type === 'success',
      'alert-danger': message.type === 'danger'
    })} role="alert">
      {message.text}
      <button 
        type="button" 
        className="close" 
        data-dismiss="alert" 
        aria-label="Close"
        onClick={e => deleteFlashMessage(message.id)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage