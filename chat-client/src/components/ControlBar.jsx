import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ControlBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      partner: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const {username, partner} = this.state
    if (username && partner) {
      this.props.joinRoom(null, username, partner)
    }
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleBlur (event) {
    const username = this.state.username
    this.props.setUsername(username)
  }

  render () {
    const usersList = this.props.activeUsers.map((user, i) => {
      return <option key={i} value={user}>{user}</option>
    })
    return (
      <div className='ControlBar'>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              id='username-input'
              name='username'
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              type='text'
              placeholder='e.g. evmo' />
          </label>

          <label>
            Converse with:
            <select
              id='partner-select'
              name='partner'
              onChange={this.handleChange}
              value={this.state.partner}>
              <option value=''>Select a user...</option>
              {usersList}
            </select>
          </label>
          <input type='submit' value='Chat' />
        </form>

      </div>
    )
  }
}

ControlBar.PropTypes = {
  joinRoom: PropTypes.func,
  activeUsers: PropTypes.arrayOf(PropTypes.string),
  setUsername: PropTypes.func
}

export default ControlBar
