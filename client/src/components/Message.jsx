import React from 'react'
import PropTypes from 'prop-types'

function Message (props) {
  const {author, body} = props.message
  return <p><strong>{author}: </strong>{body}</p>
}

Message.PropTypes = {
  message: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    room: PropTypes.string
  })
}

export default Message
