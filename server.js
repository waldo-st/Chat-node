const http = require("http")
const Websocket = require("ws")
const port = 8000

const server = http.createServer()
const socket = new Websocket.Server({ server })

socket.on("connection", (ws)=>{
    // console.log("wsss",ws)
    ws.on("message", (data)=>{
        // const message = JSON.parse(data)
        console.log("RECEIVED DATA:", data)
        socket.clients.forEach(client => {
            client.send(data)
        });
    })
})

server.listen(port, "localhost", ()=>{
    console.log("listening for request on port", port)
})