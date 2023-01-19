const express = require("express");
const notFound = require("./middlewares/not-found");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const rootRouter = require("./routes/root/root.router");
const courseRouter = require("./routes/course/course.router");
const authRouter = require("./routes/auth/auth.router");
const enrollRouter = require("./routes/enroll/enroll.router");
const userRouter = require("./routes/user/user.router");
const { auth } = require("./middlewares/jwt");

app.use(
  cors({
    origin: '*'
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} - ${delta}ms`);
});

app.use("/", rootRouter);
app.use("/api/course", courseRouter);
app.use("/api/auth", authRouter);
app.use("/api/enroll", enrollRouter);
app.use("/api/user", userRouter);
app.use(auth);
app.use(notFound);

module.exports = app;
