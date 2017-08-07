import React, { Component } from 'react'
import ControlBar from './components/ControlBar'
import Conversations from './components/Conversations'
import Flash from './components/Flash'
import io from 'socket.io-client'
import logo from './images/smiling-cat.png'

const socket = io('http://localhost:5000')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      activeUsers: [],
      rooms: [],
      messages: [],
      flashNotice: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.createFlash = this.createFlash.bind(this)
    this.clearFlash = this.clearFlash.bind(this)
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  setUsername (username) {
    const oldName = this.state.username
    if (oldName && oldName !== username) {
      socket.emit('deactivate_user', { username: oldName })
    }
    this.setState({ username }, () => {
      socket.emit('activate_user', { username: this.state.username })
    })
  }

  loadMessages () {
    const savedMessages = window.localStorage.getItem('messages')
    if (savedMessages) {
      this.setState({ messages: JSON.parse(savedMessages) || [] })
    }
  }

  setSocketListeners () {
    socket.on('message', (data) => {
      console.log(data.message)
    })

    socket.on('message_sent', (message) => {
      const room = message['room']
      this.setState({ messages: [...this.state.messages, message] }, () => {
        window.localStorage.setItem('messages', JSON.stringify(this.state.messages))
        if (this.state.rooms.indexOf(room) === -1) {
          this.setState({ rooms: [...this.state.rooms, room] })
        }
      })
    })

    socket.on('retrieve_active_users', () => {
      if (this.state.username) {
        socket.emit('activate_user', { username: this.state.username })
      }
    })

    socket.on('user_activated', (data) => {
      const user = data['user']
      const { activeUsers } = this.state
      if (activeUsers.indexOf(user) === -1 && user !== this.state.username) {
        this.setState({ activeUsers: [...activeUsers, user] }, () => {
          this.createFlash(`${user} is online`)
        })
      }
    })

    socket.on('user_deactivated', (data) => {
      const deactivatedUser = data['user']
      const { activeUsers } = this.state
      if (activeUsers.indexOf(deactivatedUser) !== -1) {
        this.setState({ activeUsers: activeUsers.filter((user) => {
          return user !== deactivatedUser
        })})
      }
    })

    socket.on('open_room', (data) => {
      const room = data['room']
      const openRooms = this.state.rooms
      const userInRoom = room.split('|').indexOf(this.state.username) !== -1
      const roomNotOpen = openRooms.indexOf(room) === -1
      if (userInRoom && roomNotOpen) {
        this.joinRoom(room, this.state.username)
      }
    })
  }

  joinRoom (room, username, partner) {
    room = room || [username, partner].sort().join('|')
    if (this.state.rooms.indexOf(room) === -1) {
      this.setState({rooms: [...this.state.rooms, room]}, () => {
        socket.emit('join_room', { username, room })
      })
    }
  }

  leaveRoom (room, username) {
    this.setState({ rooms: this.state.rooms.filter((r) => r !== room) })
  }

  sendMessage (message, room) {
    socket.emit(
      'send_message',
      {
        room,
        author: this.state.username,
        body: message,
        timeStamp: Date.now()
      }
    )
  }

  createFlash (text) {
    this.setState({flashNotice: ''}, () => {
      this.setState({flashNotice: text}, () => {
        window.setTimeout(this.clearFlash, 2500)
      })
    })
  }

  clearFlash () {
    this.setState({flashNotice: ''})
  }

  componentDidMount () {
    this.loadMessages()
    this.setSocketListeners()
  }

  render () {
    const {username, rooms, messages, flashNotice} = this.state

    return (
      <div className='App'>
        <div className='header'>
          <img className='logo' src={logo} alt='logo' />
          <h1 className='title'>Le Chat</h1>
        </div>
        <Flash notice={flashNotice} />
        <ControlBar
          activeUsers={this.state.activeUsers}
          setUsername={this.setUsername}
          createFlash={this.createFlash}
          joinRoom={this.joinRoom} />
        <Conversations
          rooms={rooms}
          messages={messages}
          username={username}
          leaveRoom={this.leaveRoom}
          sendMessage={this.sendMessage} />
      </div>
    )
  }
}

export default App
