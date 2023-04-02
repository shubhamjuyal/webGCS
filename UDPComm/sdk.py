#!/usr/bin/env python3

import asyncio
import json
import socketio
from mavsdk import System
import time

async def run():
    # Connect to the drone
    drone = System()
    await drone.connect(system_address="udp://:14550")

    # Get the list of parameters
    all_params = await drone.param.get_all_params()

    # Convert parameter data to a dictionary
    params_dict = {}
    for param in all_params.int_params + all_params.float_params:
        params_dict[param.name] = param.value

    # Convert dictionary to JSON string
    params_json = json.dumps(params_dict)
    print(params_json)
    # Send JSON string via Socket.IO
    sio = socketio.Client()
    sio.connect('http://localhost:8000')
    sio.emit('message', params_json)
    # sio.disconnect()
    time.sleep(1)

# Run the asyncio loop
asyncio.run(run())
