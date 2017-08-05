import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatWindow from './ChatWindow'

class Conversations extends Component {
  constructor (props) {
    super(props)
    this.getPartnerName = this.getPartnerName.bind(this)
  }

  getPartnerName (room) {
    const members = room.split('|')
    return members.filter((member) => member !== this.props.username)[0]
  }

  filterMessages (messages, room) {
    return messages.filter((message) => {
      return message.room === room
    })
  }

  render () {
    const {username, rooms, leaveRoom, sendMessage, messages} = this.props
    const chatWindows = rooms.map((room, i) => {
      const roomMessages = this.filterMessages(messages, room)
      const partner = this.getPartnerName(room)
      return (
        <ChatWindow
          key={i}
          room={room}
          username={username}
          partner={partner}
          messages={roomMessages}
          leaveRoom={leaveRoom}
          sendMessage={sendMessage} />
      )
    })
    return (
      <div className='Conversations'>
        {chatWindows}
      </div>
    )
  }
}

Conversations.PropTypes = {
  username: PropTypes.string,
  rooms: PropTypes.arrayOf(PropTypes.string),
  sendMessage: PropTypes.func,
  leaveRoom: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    room: PropTypes.string
  }))
}

export default Conversations
