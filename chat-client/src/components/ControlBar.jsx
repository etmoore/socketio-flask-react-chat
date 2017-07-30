import React, { Component } from 'react'
import './ControlBar.css'

class ControlBar extends Component {
  render () {
    return (
      <div className='ControlBar'>

        <label for='username'>
          Username:
          <input name='username' id='username' type='text' placeholder='e.g. W3C' />
        </label>

        <label for='partner'>
          Start a Conversation:
          <select name='partner' id='partner'>
            <option value='Select a user...' selected disbled >Select a user...</option>
          </select>
        </label>

      </div>
    )
  }
}

export default ControlBar
