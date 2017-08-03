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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  handleChange (event) {
    this.setState({ message: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    socket.emit('message_send', {message: this.state.message})
  }

  componentDidMount () {
    socket.on('connect', () => {
      console.log('Client connected!')
    })
    socket.on('message_receive', (data) => {
      const textNode = document.createTextNode(data.message)
      document.getElementById('log').appendChild(textNode)
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
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar joinRoom={this.joinRoom} />
        <Conversations />
        <form action='#' method='POST' onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input type='text'
                   onChange={this.handleChange}
                   value={this.state.message} />
          </label>
          <input type='submit' value='Send' />
        </form>
        <div id='log' />
      </div>
    )
  }
}

export default App
