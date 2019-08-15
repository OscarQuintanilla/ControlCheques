import { Router } from "express";
import sesionController from "../controllers/sesionController";

export class SesionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/log", sesionController.buscarUsuario);
  }
}

const sesionRoutes = new SesionRoutes();
export default sesionRoutes.router;
