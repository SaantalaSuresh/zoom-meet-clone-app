// // require("dotenv").config();
// // const express = require("express");
// // const http = require("http");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const port = process.env.PORT;
// // const app = express();
// // const server = http.createServer(app);
// // const Routes = require("./app/routes");
// // const path = require('path');

// // app.use([
// //   cors(),
// //   bodyParser.json(),
// //   bodyParser.urlencoded({ extended: false }),
// //   Routes,
// // ]);

// // // const io = (module.exports.io = require("socket.io")(server));
// // // This is missing in the video.
// // const io = (module.exports.io = require('socket.io')(server, {
// //     cors: {
// //         origin: '*',
// //     }
// // }));
// // const socketManager = require("./app/socketManager");
// // io.on("connection", socketManager);

// // if (process.env.NODE_ENV === 'production') {
// //   // Serve any static files
// //   app.use(express.static(path.join(__dirname, 'client/build')));
// // // Handle React routing, return all requests to React app
// //   app.get('*', function(req, res) {
// //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// //   });
// // }

// // server.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// require("dotenv").config();

// const express = require("express");
// const http = require("http");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const port = process.env.PORT || 3000; // added default port
// const app = express();
// const server = http.createServer(app);
// const Routes = require("./app/routes");
// const path = require('path');
// const socketManager = require("./app/socketManager");

// app.use([
//   cors(),
//   bodyParser.json(),
//   bodyParser.urlencoded({ extended: false }),
// ]);

// app.use('/api', Routes); // corrected route usage

// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   }
// });

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // handle chat message
//   socket.on("chatMessage", (message) => {
//     console.log(`Received message: ${message}`);
//     io.emit("chatMessage", message); // broadcast message to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });





require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const connectDB = require("./app/config/db");
const routes = require("./app/routes");
const Message = require("./app/models/Message");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

// Socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chatMessage", async (messageData) => {
    try {
      const message = new Message(messageData);
      await message.save();
      io.emit("chatMessage", message);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
