from pymavlink import mavutil
import json
import socket
import time
UDP_IP = "127.0.0.1"
UDP_PORT = 14550

TCP_IP = "127.0.0.1"
TCP_PORT = 8000

# Connect to the MAVLink UDP stream
mavlink_conn = mavutil.mavlink_connection('udp:{0}:{1}'.format(UDP_IP, UDP_PORT))

# Connect to the TCP server
tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
tcp_sock.connect((TCP_IP, TCP_PORT))

# # Send a MAVLink message to the server
# msg = mavutil.mavlink.MAVLink_heartbeat_message(
#     mavutil.mavlink.MAV_TYPE_GCS,
#     mavutil.mavlink.MAV_AUTOPILOT_INVALID,
#     0,
#     0,
#     0)
# mavlink_conn.send(msg)

# Receive a MAVLink message from the UDP stream
while True:
    msg = mavlink_conn.recv_msg()
    if msg is not None:
        # Convert the MAVLink message to a dictionary
        msg_dict = msg.to_dict()
        # Convert the dictionary to a JSON-formatted string
        json_msg = json.dumps(msg_dict)
        encoded_json_msg = json_msg.encode()
        # Send the JSON-formatted message to the TCP server
        tcp_sock.sendall(encoded_json_msg)
        time.sleep(0.0000000001)