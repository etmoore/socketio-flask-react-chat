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
      rooms: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  componentDidMount () {
    socket.on('connect', () => {
      console.log('Client connected!')
    })
    socket.on('message', (data) => {
      console.log(data.message)
    })
  }

  joinRoom (username, partner) {
    this.setState({username: username})
    const room = [username, partner].sort().join('|')
    socket.emit(
      'join_room',
      { username, room },
      () => this.setState({rooms: [...this.state.rooms, room]})
    )
  }

  render () {
    const {username, rooms} = this.state
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar joinRoom={this.joinRoom} />
        <Conversations
          rooms={rooms}
          username={username}/>
      </div>
    )
  }
}

export default App
