import { Request, Response } from "express";
import sql from "mssql";
import keys from "../../config/keys";

export class ChequesController {
  public listarCheque(req: Request, res: Response) {
    const pool = new sql.ConnectionPool(keys);
    const request = new sql.Request(pool);

    const { Dealer } = req.body;

    pool.connect(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      request.query(
        `SELECT * FROM Chqs WHERE Dealer = ${Dealer}`,
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

  public registrarCheque(req: Request, res: Response) {
    const pool = new sql.ConnectionPool(keys);
    const request = new sql.Request(pool);

    var {
      CodPais, //Login
      Dealer, //Login
      Tda, //Login
      Cuenta,
      ChequeNo,
      Fecha,
      Partida, // Blanco
      Nombre,
      Valor,
      Concepto,
      CargoCuenta, //Blanco
      Estatus,
      Hecho, //Login Nombre del Usuario
      Anular,
      Rubro,
      Linea, //1
      Proveedor, //Bln
      OrdenCompra, // 0
      MarcaAnticipo, // 0
      SaldoAnticipo, // 0
      SolicitadoPor, //Blanco
      FechaCobro // 1/1/1901
    } = req.body;

    pool.connect(function(err) {
      console.log(req.body);
      if (err) {
        console.log(err);
        return;
      }
      request.batch(
        `INSERT INTO Chqs (
          CodPais,      
          Dealer,     
          Tda,          
          Cuenta,         
          ChequeNo,
          Fecha, 
          Partida,    
          Nombre,       
          Valor,          
          Concepto, 
          CargoCuenta, 
          Estatus,    
          Hecho,        
          Anular,         
          Rubro,
          Linea, 
          Proveedor,
          OrdenCompra,  
          MarcaAnticipo,  
          SaldoAnticipo,
          SolicitadoPor,
          FechaCobro
        ) VALUES (
          '${CodPais}',
          ${Dealer},
          '${Tda}',
          '${Cuenta}',
          ${ChequeNo},
          '${Fecha}',
          '${Partida}',
          '${Nombre}',
          ${Valor},
          '${Concepto}',
          '${CargoCuenta}',
          ${Estatus},
          '${Hecho}',
          ${Anular},
          ${Rubro},
          ${Linea},
          '${Proveedor}',
          ${OrdenCompra},
          ${MarcaAnticipo},
          ${SaldoAnticipo},
          '${SolicitadoPor}',
          '${FechaCobro}'
          )`,
        (err, recordset) => {
          if (err) {
            pool.close();
            console.log(err);
            res.send(err);
          } else {
            pool.close();
            res.json(recordset);
          }
        }
      );
    });
  }

  public modificarCheque(req: Request, res: Response) {
    const pool = new sql.ConnectionPool(keys);
    const request = new sql.Request(pool);

    const { Dealer, Cuenta, Fecha, Nombre, Valor, Concepto } = req.body;

    pool.connect(function(err) {
      res.send(req.body);

      if (err) {
        console.log(err);
      }
      request.batch(
        `INSERT INTO Chqs VALUES (${req.body})`,
        (err, recordset) => {
          if (err) {
            pool.close();
            console.log(err);
            res.send(err);
          } else {
            pool.close();
            res.send(req.body);
          }
        }
      );
    });
  }

  public eliminarCheque(req: Request, res: Response) {
    const pool = new sql.ConnectionPool(keys);
    const request = new sql.Request(pool);

    const { ChequeNo } = req.body;

    pool.connect(function(err) {
      if (err) {
        console.log(err);
      }
      request.batch(
        `DELETE FROM Chqs WHERE ChequeNo = (${ChequeNo})`,
        (err, recordset) => {
          if (err) {
            pool.close();
            console.log(err);
            res.send(err);  
          } else {
            pool.close();
            res.send(recordset);
          }
        }
      );
    });
  }
}

const chequesController = new ChequesController();
export default chequesController;

// INSERT INTO Chqs (Dealer, Cuenta, Fecha, Nombre,  Valor, Concepto) VALUES (${Dealer},${Cuenta},${Fecha},${Nombre},${Valor},${Concepto})
