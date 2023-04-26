from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from random import randint
""" from flask_cors import CORS
import zmq
 """
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
""" CORS(app, resources={r"/*":{"origins":"*"}}) """
""" context = zmq.Context()
socket = context.socket(zmq.SUB) """

"""socketio.emit: envia a mensagem a todos os usuários.
emit: envia apenas ao usuário logado.
"""

@socketio.on('connect')
def handle_connect():
    print("----Conectou")
    """ socket.connect('tcp://localhost:5555')
    socket.setsockopt_string(zmq.SUBSCRIBE, '') """
@socketio.on('message')
def handle_message(message): 
    time = randint(0,100)    
    """ message = socket.recv_string() """
    print("----Mensagem recebida: ", message)
    socketio.emit('message', {'message': message, 'time':time })
    """ print("----zeromq: ", socket.recv_string()) """
    
    
if __name__ == '__main__':
    socketio.run(app)