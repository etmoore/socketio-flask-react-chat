import React, { Component } from 'react'
import './ControlBar.css'

class ControlBar extends Component {
  render () {
    return (
      <div className='ControlBar'>

        <label htmlFor='username'>
          Username:
          <input name='username' id='username' type='text' placeholder='e.g. evmo' />
        </label>

        <label htmlFor='partner'>
          Start a Conversation:
          <select name='partner' id='partner' >
            <option value='Tom'>Tom</option>
            <option value='WillC'>WillC</option>
            <option value='Po'>Po</option>
          </select>
        </label>

      </div>
    )
  }
}

export default ControlBar
