import socket
import json
from pymavlink import mavutil

# Configure UDP socket to listen for MAVLink data
ip_address = '127.0.0.1'
udp_port = 14550
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind((ip_address, udp_port))

# Connect to Node.js server
host = '127.0.0.1'
port = 5501
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((host, port))

# Loop to read MAVLink messages and send to Node.js server
while True:
    # Receive data from UDP socket
    data, addr = udp_socket.recvfrom(14550)
    msg = mavutil.mavlink.MAVLink(data)
    msg_str = str(msg)
    print("Received message:", msg_str)
            
    # Encode MAVLink message as JSON and send to server
    # json_msg = msg.to_dict()
    # sock.sendall(json.dumps(json_msg).encode('utf-8'))
