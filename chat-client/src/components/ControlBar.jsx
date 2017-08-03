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
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const {username, partner} = this.state
    if (username && partner) {
      this.props.joinRoom(username, partner)
    }
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value})
  }

  render () {
    return (
      <div className='ControlBar'>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name='username'
              onChange={this.handleChange}
              type='text'
              placeholder='e.g. evmo' />
          </label>

          <label>
            Start a Conversation:
            <select
              name='partner'
              onChange={this.handleChange}
              value={this.state.partner}>
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
