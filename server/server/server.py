from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socketio = SocketIO(app)
CORS(app)


@socketio.on('connect')
def connect():
    emit('my_response', {'message': 'Hello from the server :)'})
