import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

class ChatWindow extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.message) {
      this.props.sendMessage(this.state.message, this.props.room)
      this.setState({ message: '' })
    }
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  closeWindow (event) {
    const {room, username} = this.props
    this.props.leaveRoom(room, username)
  }

  scrollToBottom () {
    this.messageWindow.scrollTop = this.messageWindow.scrollHeight
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  render () {
    const {partner, messages} = this.props
    const messageList = messages.map((message, i) => {
      return (
        <Message
          message={message}
          key={i} />
      )
    })
    return (
      <div className='ChatWindow'>
        <div className='chat-header'>
          <h2>{partner}</h2>
          <button onClick={this.closeWindow}>X</button>
        </div>
        <div className='chat-body' ref={(el) => { this.messageWindow = el }}>
          {messageList}
        </div>
        <div className='chat-input'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='message'
              className='chat-message'
              placeholder='your message here...'
              value={this.state.message}
              onChange={this.handleChange} />
          </form>
        </div>
      </div>
    )
  }
}

ChatWindow.PropTypes = {
  username: PropTypes.string,
  partner: PropTypes.string,
  room: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    room: PropTypes.string
  })),
  sendMessage: PropTypes.func,
  leaveRoom: PropTypes.func
}

export default ChatWindow
