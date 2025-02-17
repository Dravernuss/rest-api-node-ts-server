import Express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue.bold("Conexion exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = Express();

var corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use(Express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
