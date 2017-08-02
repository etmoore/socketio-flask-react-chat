import React, { Component } from 'react'
import './App.css'
import ControlBar from './components/ControlBar'
import Conversations from './components/Conversations'
import io from 'socket.io-client'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar />
        <Conversations />
        <div className='log' />
      </div>
    )
  }

  componentDidMount () {
    const socket = io('http://localhost:5000')

    socket.on('connect', () => {
      console.log('Client connected!')
    })
    socket.on('my_response', (data) => {
      console.log(data.message)
    })
  }
}

export default App
