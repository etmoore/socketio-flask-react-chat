import React, { Component } from 'react'
import './App.css'
import ControlBar from './components/ControlBar'
import Conversations from './components/Conversations'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      activeUsers: [],
      rooms: [],
      messages: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.sendChat = this.sendChat.bind(this)
    this.setUsername = this.setUsername.bind(this)
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  setUsername (username) {
    this.setState({ username }, () => {
      socket.emit('active_user', { username: this.state.username })
    })
  }

  componentDidMount () {
    socket.on('connect', () => {
      console.log('Client connected!')
    })
    socket.on('message', (data) => {
      console.log(data.message)
    })
    socket.on('chat_received', (data) => {
      console.log(data)
      this.setState({ messages: [...this.state.messages, data] })
    })
    socket.on('whos_there', () => {
      console.log('server: whos there?')
      if (this.state.username){
        socket.emit('active_user', { username: this.state.username })
      }
    })
    socket.on('register_user', (data) => {
      const user = data['user']
      const {activeUsers} = this.state
      if (activeUsers.indexOf(user) === -1 && user !== this.state.username) {
        this.setState({ activeUsers: [...activeUsers, user] })
      }
    })
  }

  joinRoom (username, partner) {
    const room = [username, partner].sort().join('|')
    socket.emit(
      'join_room',
      { username, room },
      () => this.setState({rooms: [...this.state.rooms, room]})
    )
  }

  leaveRoom (room, username) {
    socket.emit(
      'leave_room',
      { room, username },
      () => this.setState({ rooms: this.state.rooms.filter((r) => r !== room) })
    )
  }

  sendChat (message, room) {
    socket.emit(
      'chat_sent',
      {
        room,
        from: this.state.username,
        body: message,
        timeStamp: Date.now()
      }
    )
  }

  render () {
    const {username, rooms, messages} = this.state
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar
          activeUsers={this.state.activeUsers}
          setUsername={this.setUsername}
          joinRoom={this.joinRoom} />
        <Conversations
          rooms={rooms}
          messages={messages}
          username={username}
          leaveRoom={this.leaveRoom}
          sendChat={this.sendChat} />
      </div>
    )
  }
}

export default App
