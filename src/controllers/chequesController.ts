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
      if (err) {
        console.log(err);
      }
      request.batch(
        `UPDATE Chqs SET 
          CodPais ='${CodPais}',      
          Dealer = ${Dealer},     
          Tda = '${Tda}',          
          Cuenta = '${Cuenta}',  
          Fecha = '${Fecha}',
          Partida = '${Partida}',    
          Nombre = '${Nombre}',       
          Valor = ${Valor},          
          Concepto = '${Concepto}',
          CargoCuenta = '${CargoCuenta}',
          Estatus = ${Estatus},    
          Hecho = '${Hecho}',        
          Anular = 0,         
          Rubro = ${Rubro},
          Linea = ${Linea}, 
          Proveedor = '${Proveedor}',
          OrdenCompra = ${OrdenCompra},  
          MarcaAnticipo = 0, 
          SaldoAnticipo = ${SaldoAnticipo},
          SolicitadoPor = '${SolicitadoPor} ',
          FechaCobro = '${FechaCobro}' 
         WHERE ChequeNo = ${ChequeNo}`,
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

    const { id } = req.body;

    pool.connect(function(err) {
      if (err) {
        console.log(err);
      }
      request.batch(
        `DELETE FROM Chqs WHERE ChequeNo = ${id}`,
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
}

const chequesController = new ChequesController();
export default chequesController;
