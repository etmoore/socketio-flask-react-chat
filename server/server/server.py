from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS

app = Flask(__name__, static_folder='../../client/build/static')
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app)
CORS(app)


@app.route('/')
def serve_static_index():
    return send_from_directory('../../client/build/', 'index.html')


@socket.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)


@socket.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)


@socket.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)


@socket.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)


@socket.on('send_message')
def on_chat_sent(data):
    room = data['room']
    emit('message_sent', data, room=room)
