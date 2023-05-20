const express = require("express");
const cors = require("cors");
const storeRouter = require("./routes/storeRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/store", storeRouter);

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

//errors
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  return res.status(status).json({
    error: { message, status },
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port);
});
