import React, { Component } from 'react'
import './ControlBar.css'

class ControlBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      partner: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changeParter = this.changeParter.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const {username, partner} = this.state
    if (username && partner) {
      this.props.joinRoom(username, partner)
    }
  }

  changeUsername (event) {
    this.setState({ username: event.target.value })
  }

  changeParter (event) {
    this.setState({ partner: event.target.value })
  }

  render () {
    return (
      <div className='ControlBar'>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name='username'
              onChange={this.changeUsername}
              type='text'
              placeholder='e.g. evmo' />
          </label>

          <label>
            Start a Conversation:
            <select onChange={this.changeParter} value={this.state.partner}>
              <option value=''>Select a user...</option>
              <option value='Tom'>Tom</option>
              <option value='WillC'>WillC</option>
              <option value='Po'>Po</option>
              <option value='evmo'>evmo</option>
            </select>
          </label>
          <input type='submit' value='Chat' />
        </form>

      </div>
    )
  }
}

export default ControlBar
