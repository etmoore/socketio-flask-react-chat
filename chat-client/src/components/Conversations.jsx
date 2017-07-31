import React, { Component } from 'react'
import './Conversations.css'

class Conversations extends Component {
  render () {
    return (
      <div className='Conversations'>

        <div className='chat'>
          <div className='chat-header'>
            <h2>PoShen</h2>
          </div>
          <div className='chat-body'>
            <p><strong>WillC:</strong> Hey Po!</p>
            <p><strong>PoShen: </strong> Hey Will, what's up?</p>
          </div>
          <div className='chat-input'>
            <input type='text' name='message' />
          </div>
        </div>

        <div className='chat'>
          <div className='chat-header'>
            <h2>Tom</h2>
          </div>
          <div className='chat-body'>
            <p><strong>Tom:</strong> Hey Will, fix the the site!</p>
            <p><strong>WillC: </strong> Sorry Tom...</p>
          </div>
          <div className='chat-input'>
            <input type='text' name='message' />
          </div>
        </div>
      </div>
    )
  }
}

export default Conversations
