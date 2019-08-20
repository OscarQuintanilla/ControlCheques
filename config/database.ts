import sql from "mssql";
import keys from "./keys";

const pool = new sql.ConnectionPool(keys);

pool.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
});

export default pool;
