import { createServer } from "node:http";

const server = createServer((req, res) => {
    res.statusCode = 200

    res.setHeader('Content-Type', 'application/json')

    const jsonResponseBody = JSON.stringify({location: 'Mars'})

    res.end(jsonResponseBody)
})

//ho messo 3002 perchè altrimenti mi caricava a vuoto
server.listen(3002, () => {
    console.log(`Server running at http://localhost:3002`)
})

//curl --verbose http://localhost:3002/
//* Host localhost:3002 was resolved.
//* IPv6: ::1
//* IPv4: 127.0.0.1
//*   Trying [::1]:3002...
//* Connected to localhost (::1) port 3002
//> GET / HTTP/1.1
//> Host: localhost:3002
//> User-Agent: curl/8.6.0
//> Accept: */*
//> 
//< HTTP/1.1 200 OK
//< Content-Type: application/json
//< Date: Mon, 10 Jun 2024 12:57:50 GMT
//< Connection: keep-alive
//< Keep-Alive: timeout=5
//< Content-Length: 19
//< 
//* Connection #0 to host localhost left intact
//{"location":"Mars"}%   