const express = require("express");
const db = require("./database/db");
const app = express();
const userRouter = require("./router/userRouter");
const profileRouter = require("./router/profileRouter");
const postRouter = require("./router/postRouter");
const config = require("config");
const path = require("path");

app.use(express.json());
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/post", postRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("successfullu connected", PORT));
