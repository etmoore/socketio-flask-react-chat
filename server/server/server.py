from flask import Flask
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app)
CORS(app)


@socket.on('connect')
def on_connect():
    emit('my_response', {'message': 'Hello from the server'}, broadcast=True)


@socket.on('disconnect')
def on_disconnect():
    print('user disconnected')
    emit('my_response', {'message': 'User disconnected from the server'})


@socket.on('join_room')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    emit('my_response',
         {'message': username + ' has entered the room:' + room},
         room=room)


@socket.on('leave_room')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


@socket.on('message_send')
def on_message_send(data):
    print(data)
    emit('message_receive', {'message': data['message']})
