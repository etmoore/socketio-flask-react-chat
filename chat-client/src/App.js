import React, { Component } from 'react'
import './App.css'
import ControlBar from './components/ControlBar'
import Conversations from './components/Conversations'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar />
        <Conversations />
      </div>
    )
  }
}

export default App
