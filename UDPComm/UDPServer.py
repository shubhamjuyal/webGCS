from pymavlink import mavutil
# from kafka import KafkaProducer

# Set up the connection to MAVProxy
connection = mavutil.mavlink_connection('udp:127.0.0.1:14550') # Replace with the IP address and port of your MAVProxy connection
# Continuously listen for incoming data

with open('file.txt', 'w') as file:
    while True:
        msg = connection.recv_msg() # Receive data from MAVProxy
        if(msg != None):
            msg_str = str(msg)
            print("Received message:", msg_str)
            file.write(msg_str+'\n')
                # Parse the incoming data and perform any necessary processing or analysis
