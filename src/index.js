require("dotenv").config();

const app = require("./server");
require("./database.js");

const PortNum = app.get("port");

app.listen(PortNum, () => {
  console.log("Server on Port", PortNum);
});
