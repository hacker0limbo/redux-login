import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addFlashMessage } from '../../actions/flashMessageActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      timezone: '',
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.user.id}`)
      .then(res => {
        const { id, ...restInfo } = res.data.user
        this.setState({
          ...restInfo
        })
      }).catch(err => {
        this.props.addFlashMessage(err.response.data.message)
      })
  }

  render() {
    return (
      <div className="profile">
        <h1 className="text-center">Your Profile</h1>
        <ul className="list-group list-group-flush">
          {Object.entries(this.state).map(([key, value]) => (
            <li className="list-group-item" key={key}>
              <strong>{key}</strong>: {value}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authInfo.user
  }
}

export default connect(mapStateToProps, { addFlashMessage })(Profile)