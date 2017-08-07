import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ControlBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      partner: ''
    }

    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.handlePartnerSubmit = this.handlePartnerSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handlePartnerSubmit (event) {
    event.preventDefault()
    const {username, partner} = this.state
    if (username && partner) {
      this.props.joinRoom(null, username, partner)
    }
  }

  handleUsernameSubmit (event) {
    event.preventDefault()
    const username = this.state.username
    if (username) {
      this.props.createFlash('successfully registered')
      this.props.setUsername(username)
    }
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  render () {
    const usersList = this.props.activeUsers.map((user, i) => {
      return <option key={i} value={user}>{user}</option>
    })
    return (
      <div className='ControlBar'>

        <form onSubmit={this.handleUsernameSubmit}>
          <label>
            <strong>Username:</strong>
            <input
              id='username-input'
              name='username'
              onChange={this.handleChange}
              type='text'
              placeholder='e.g. evmo' />
          </label>
          <button type='submit'>Register</button>
        </form>

        <form onSubmit={this.handlePartnerSubmit}>
          <div>
            <label>
              <strong>Partner:</strong>
              <select
                id='partner-select'
                name='partner'
                onChange={this.handleChange}
                value={this.state.partner}>
                {this.props.activeUsers.length > 0
                  ? <option value=''>Select a user...</option>
                  : <option value=''>Waiting for others...</option>
                }
                {usersList}
              </select>
            </label>
            <button type='submit'>Chat</button>
          </div>
        </form>

      </div>
    )
  }
}

ControlBar.PropTypes = {
  joinRoom: PropTypes.func,
  activeUsers: PropTypes.arrayOf(PropTypes.string),
  setUsername: PropTypes.func,
  createFlash: PropTypes.func
}

export default ControlBar
