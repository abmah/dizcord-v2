const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname + "/public")));
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// handling the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

// error handlers //
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}
//***********************//

module.exports = app;
