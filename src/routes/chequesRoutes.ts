import { Router } from "express";
import chequesController from "../controllers/chequesController";

class ChequesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/listar", chequesController.listarCheque);
    this.router.post("/registrar", chequesController.registrarCheque);
    this.router.put("/modificar", chequesController.modificarCheque);
    this.router.post("/eliminar", chequesController.eliminarCheque);
    this.router.post("/rubros", chequesController.listarRubros);
  }
}

const chequesRoutes = new ChequesRoutes();
export default chequesRoutes.router;
