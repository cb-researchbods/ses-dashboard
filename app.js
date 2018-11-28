// app.js
// Controls the flow and structure of the webapp

// Imports any required modules
const config = require("./config");
const express = require("express");
const app = express();
const path = require("path");

// Configures express to use pug templating
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Configures express to use static files
app.use(express.static(path.join(__dirname, "public")));

// Configures the HTTP server's routing rules
require("./routes")(app);

// Starts the express server
app.listen(config.port, () => {
  console.log(`[+] Listening on ${config.port}`);
});
