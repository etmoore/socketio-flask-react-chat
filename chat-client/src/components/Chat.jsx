import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.message) {
      this.props.sendChat(this.state.message, this.props.room)
    }
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  render () {
    const {partner} = this.props
    return (
      <div className='chat'>
        <div className='chat-header'>
          <h2>{partner}</h2>
        </div>
        <div className='chat-body'>
          <p><strong>WillC:</strong> Hey Po!</p>
          <p><strong>PoShen: </strong> Hey Will, what's up?</p>
        </div>
        <div className='chat-input'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='message'
              value={this.state.message}
              onChange={this.handleChange}/>
          </form>
        </div>
      </div>
    )
  }
}

Chat.PropTypes = {
  username: PropTypes.string,
  partner: PropTypes.string,
  room: PropTypes.string,
  sendChat: PropTypes.func
}

export default Chat
