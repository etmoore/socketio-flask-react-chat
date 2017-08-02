import React, { Component } from 'react'
import './App.css'
import ControlBar from './components/ControlBar'
import Conversations from './components/Conversations'
import io from 'socket.io-client'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
    this.socket = io('http://localhost:5000')
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({ message: event.target.value })
  }
  handleSubmit (event) {
    event.preventDefault()
    this.socket.emit('message#send', {message: this.state.message})
  }
  componentDidMount () {
    this.socket.on('connect', () => {
      console.log('Client connected!')
    })
    this.socket.on('message#receive', (data) => {
      const textNode = document.createTextNode(data.message)
      document.getElementById('log').appendChild(textNode)
    })
    this.socket.on('my_response', (data) => {
      console.log(data.message)
    })
  }
  render () {
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar />
        <Conversations />
        <form action='#' method='POST' onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input type="text"
                   onChange={this.handleChange}
                   value={this.state.message} />
          </label>
          <input type="submit" value="Send" />
        </form>
        <div id='log' />
      </div>
    )
  }

}

export default App
