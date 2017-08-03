import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chat extends Component {
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
          <input type='text' name='chat-message' />
        </div>
      </div>
    )
  }
}

Chat.PropTypes = {
  username: PropTypes.string,
  partner: PropTypes.string,
  room: PropTypes.string
}

export default Chat
