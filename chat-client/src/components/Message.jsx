import React from 'react'
import PropTypes from 'prop-types'

function Message (props) {
  const {from, body} = props.message
  return <p><strong>{from}: </strong>{body}</p>
}

Message.PropTypes = {
  message: PropTypes.shape({
    from: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    room: PropTypes.string
  })
}

export default Message
