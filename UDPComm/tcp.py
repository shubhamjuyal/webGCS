import asyncio
import json
import socket

from mavsdk import System


async def run():
    # Connect to the drone
    drone = System()
    await drone.connect(system_address="udp://:14550")

    # Create a TCP socket
    tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_socket.connect(('localhost', 8000))

    # Start telemetry
    telemetry = drone.telemetry

    # Send telemetry data over TCP every 1 second
    while True:
        # Get telemetry values
        async for telemetry_data in telemetry.position():
            lat = telemetry_data.latitude_deg
            lon = telemetry_data.longitude_deg

            # Create JSON object with telemetry values
            telemetry_dict = {"latitude": lat, "longitude": lon}
            telemetry_json = json.dumps(telemetry_dict)
            print(telemetry_dict)
            # Send telemetry data over TCP
            tcp_socket.send(telemetry_json.encode())

        # Wait for 1 second before sending updated data again
        # await asyncio.sleep(1)

    # Close the TCP socket
    tcp_socket.close()

# Run the asyncio loop
asyncio.run(run())
