import React, { Component } from 'react'
import './App.css'
import ControlBar from './components/ControlBar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Chat Server</h1>
        <ControlBar />
      </div>
    )
  }
}

export default App
