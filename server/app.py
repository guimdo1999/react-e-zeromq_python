from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from random import randint
import time

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


@socketio.on('foo1')
def handle_foo(): 
    tempo=0
    print("foo")
    while tempo < 10:
        random = randint(0,100)
        socketio.emit('foo1', {'foo': random, 'time':tempo })
        tempo = tempo+1
        time.sleep(1)

@socketio.on('message')
def handle_message(message): 
    print("---Mensagem:", message)
    socketio.emit('message', message)


if __name__ == '__main__':
    socketio.run(app)