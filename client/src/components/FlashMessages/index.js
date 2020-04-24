import React from 'react'
import { connect } from 'react-redux'
import { deleteFlashMessage } from '../../actions/flashMessageActions'
import FlashMessage from './FlashMessage'
import PropTypes from 'prop-types';

const FlashMessages = props => {
  if (props.messages.length > 0) {
    // 当且仅当有 flash message 的时候才进行渲染
    return (
      <div className="flash mt-3">
        {props.messages.map(message => (
          <FlashMessage 
            key={message.id} 
            message={message}
            deleteFlashMessage={props.deleteFlashMessage}
          />
        ))}
      </div>
    )  
  }

  return null
}

FlashMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessages)