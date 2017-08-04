import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

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
    const {partner, messages} = this.props
    const chats = messages.map((message, i) => {
      return (
        <Message
          message={message}
          key={i} />
      )
    })
    return (
      <div className='chat'>
        <div className='chat-header'>
          <h2>{partner}</h2>
        </div>
        <div className='chat-body'>
          {chats}
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
  messages: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    room: PropTypes.string
  })),
  sendChat: PropTypes.func
}

export default Chat
