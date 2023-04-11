from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import zmq

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, resources={r"/*":{"origins":"*"}})
context = zmq.Context()
socket = context.socket(zmq.SUB)

@socketio.on('connect')
def handle_connect():
    print("----Conectou")
    socket.connect('tcp://localhost:5555')
    socket.setsockopt_string(zmq.SUBSCRIBE, '')

@socketio.on('message')
def handle_message(message): 
    """ message = socket.recv_string() """
    print("----Mensagem recebida: ", message)
    emit('message', message)
    """ print("----zeromq: ", socket.recv_string()) """
    
    
if __name__ == '__main__':
    socketio.run(app)