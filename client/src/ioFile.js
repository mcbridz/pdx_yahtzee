// import io from "socket.io"; //HEROKU
import io from "socket.io-client"; //DEVELOPMENT
let output;
  if (process.env.NODE_ENV === "production") {
    output = io();
  } else {
    console.log('CREATING SOCKET')
    output = io("http://localhost:8000", { transports: ["websocket"] });
}
const socket = output

export default socket;
