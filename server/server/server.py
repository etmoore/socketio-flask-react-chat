from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app)
CORS(app)


@socket.on('connect')
def connect():
    emit('my_response', {'message': 'Hello from the server'})


@socket.on('message#send')
def message_send(data):
    print(data)
    emit('message#receive', {'message': data['message']})
