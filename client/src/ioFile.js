import io from "socket.io"; //HEROKU
// import io from "socket.io-client"; //DEVELOPMENT
var output;
if (process.env.NODE_ENV === "production") {
  console.log("Creating Heroku Socket")
  output = io();
  console.log(output)
  console.log(output.connected)
} else {
  console.log('CREATING SOCKET')
  output = io("http://localhost:8000", { transports: ["websocket"] });
}
const socket = output

export default socket;
