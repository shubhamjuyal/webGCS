# from pymavlink import mavutil
from pymavlink import mavutil
import json
import socket
from time import sleep as s

# UDP IP/PORT CONFIGURATIONS
UDP_IP = "127.0.0.1"
UDP_PORT = 14550

# Connect to the MAVLink UDP stream
mavlink_conn = mavutil.mavlink_connection(f'udp:{UDP_IP}:{UDP_PORT}')


# # TCP IP/PORT SERVER CONFIGURATIONS
# TCP_IP = "127.0.0.1"
# TCP_PORT = 8000

# # Connect to the TCP server
# tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# tcp_sock.connect((TCP_IP, TCP_PORT))

UDP_IP = "127.0.0.1" # Change to your desired IP address
UDP_PORT = 5005 # Change to your desired port number
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)


# # Send a MAVLink message to the UDP server back
# msg = mavutil.mavlink.MAVLink_heartbeat_message(
#     mavutil.mavlink.MAV_TYPE_GCS,
#     mavutil.mavlink.MAV_AUTOPILOT_INVALID,
#     0,
#     0,
#     0)
# mavlink_conn.send(msg)


# Receive a MAVLink message from the UDP stream and send it to TCP server
while True:
    msg = mavlink_conn.recv_match()
    if msg:
        msg_dict = msg.to_dict()
        
        # To get Raw DATA
        # print(msg_dict) 

        json_msg = json.dumps(msg_dict)
        fmsg=json.loads(json_msg)    
    
        if fmsg.get("mavpackettype") == 'GLOBAL_POSITION_INT':
            # Here we are only fetching lat & lon specifically (can be changed further for our requirements) 
            coord={'lat': fmsg.get('lat')/1e7, 'lon': fmsg.get('lon')/1e7}
            formattedcoord=json.dumps(coord)
            maindata=formattedcoord.encode('utf-8')
            sock.sendto(maindata, (UDP_IP, UDP_PORT))
            print(f"Lat: {fmsg.get('lat')/1e7} Lon: {fmsg.get('lon')/1e7}")
            print(f"Time Boot: {fmsg.get('time_boot_ms')}")
            s(0.0000001)
