const app = require("./app");
const http = require("http");
// const config = require('./config/config');
const logger = require("./config/logger");
const scheduler = require("./schedules/delete_support.schedule");

let server = http.createServer(app);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

const port = parseInt(process.env.PORT) || 8080;
const host = process.env.HOST || "0.0.0.0";
app.set("port", port);
scheduler.delete_support();

server.listen(port);
console.log("Running on http://" + host + ":" + port);
