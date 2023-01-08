require("dotenv").config();
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8000;
const connectDB = require("./middlewares/connect-db");

const server = http.createServer(app);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    server.listen(PORT, () => {
      console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`⚠️ [ERROR], ${error}`);
  }
};

start();
