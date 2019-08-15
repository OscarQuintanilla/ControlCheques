import { Request, Response } from "express";
import sql from "mssql";
import keys from "../../config/keys";

export class SesionController {
  public buscarUsuario(req: Request, res: Response) {
    const pool = new sql.ConnectionPool(keys);
    const request = new sql.Request(pool);

    const { Dealer } = req.body;
    console.log(req.body);

    pool.connect(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      request.query(
        `SELECT * FROM base WHERE Dealer = \'${Dealer}\'`,
        (err, recordset) => {
          if (err) {
            pool.close();
            console.log(err);
            res.send(err);
          } else {
            pool.close();
            res.json(recordset.recordset);
          }
        }
      );
    });
  }
}

const sesionController = new SesionController();
export default sesionController;
