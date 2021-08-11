const express = require("express");
const app = express();
const hikesRouter = require('./routes/hikes')

const PORT = process.env.PORT || 3001;

app.use("/hikes", hikesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});