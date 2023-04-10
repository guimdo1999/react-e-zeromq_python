from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import zmq

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
context = zmq.Context()
socket = context.socket(zmq.SUB)

@socketio.on('connect')
def handle_connect():
    socket.connect('tcp://localhost:5555')
    socket.setsockopt_string(zmq.SUBSCRIBE, b'')

@socketio.on('message')
def handle_message(data): 
    print("mensagem: "+ data)
    socket.send_string(data)
    
if __name__ == '__main__':
    socketio.run(app)