# Point of this project
Have you ever played, or seen someone else playing a game like Vampire Survivors and thought: 
"That'd be fun, but I wish it was free and I could play with my friends."? 

Well, look no further than this repo, I am slowly working towards making a fun and entertaining game lie Vampire Survivors you can play in your browser with your friends.
# How to run the server
First go into the server and make sure the node modules are installed:
```bash
cd websocket-server
npm install
```
Then, run the server with:
```bash
./run
```
# Connect locally with browser once the server is running
[](http://127.0.0.1:8080)http://127.0.0.1:8080


# More details on how it works
The server uses Express to manage how data should be sent.

I have made a function based api call structure, where you can easily add and change calls to the server. This makes it easy for the client to read data from the server

One potential bottle neck is that due to the structure, there is no way for the server to call the client. The server has to rely on the client to send data when it's ready
