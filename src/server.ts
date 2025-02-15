import Express from "express";
import colors from "colors";
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

server.use(Express.json());

server.use("/api/products", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde api" });
});

export default server;
