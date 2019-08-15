import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';

//routes
import chequesRoutes from "./src/routes/chequesRoutes";
import sesionRoutes from "./src/routes/sesionRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 5000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use("/sesion", sesionRoutes);
    this.app.use("/cheques", chequesRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Servidor en el puerto: ", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
