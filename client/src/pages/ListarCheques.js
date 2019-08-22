import React from "react";
import HeaderBar from "../components/HeaderBar";
import api from '../api';
import "./styles/ListarCheques.css";
import PageLoading from '../components/PageLoading';
import { Link } from "react-router-dom";

class ListarCheques extends React.Component {

  state = {
    loading: true,
    error: null,
    listaCheques: undefined,
    user: undefined,

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const listaCheques = await api.cheques.list(JSON.parse(sessionStorage.getItem('user')));
      this.setState({ loading: false, listaCheques: listaCheques });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  render() {
    let i = 0;

    if (this.state.loading === true) {
      return (
        <div>
          <HeaderBar />
          <PageLoading />
        </div>
      );
    }
    return (
      <div>
        <HeaderBar />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row header mx-5 my-2">
              <div className="col-1">Cuenta</div>
              <div className="col-1"># Cheque</div>
              <div className="col-2">Fecha</div>
              <div className="col-2">Nombre</div>
              <div className="col-1">Valor</div>
              <div className="col-2">Concepto</div>
              <div className="col-1">Rubro</div>
              <div className="col-2"> <Link to='/cheques/registrar'><button type="button" className="form-control btn-success" >Agregar Cheque</button></Link> </div>
            </div>
            {
              this.state.listaCheques.map(cheque => {
                i++;
                return (
                  <div className="chequeBadge row mx-5 mb-3" key={i - 1}>
                    <div className="col-1" name="cuenta">{cheque.Cuenta}</div>
                    <div className="col-1" name="numCheque">{cheque.ChequeNo}</div>
                    <div className="col-2" name="fechaCheque">{cheque.Fecha}</div>
                    <div className="col-2" name="nombre" >{cheque.Nombre}</div>
                    <div className="col-1" name="valor" >{cheque.Valor}</div>
                    <div className="col-2" name="concepto">{cheque.Concepto} </div>
                    <div className="col-1" name="rubro">{cheque.Rubro}</div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col-6">
                          <button type="button" className="form-control btn-info">Modifcar</button>
                        </div>
                        <div className="col-6">
                          <button type="button" className="form-control btn-danger">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ListarCheques;