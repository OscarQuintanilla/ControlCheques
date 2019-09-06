import React from "react";
import HeaderBar from "../components/HeaderBar";
import api from "../api";
import "./styles/ListarCheques.css";
import PageLoading from "../components/PageLoading";
import { Link, Redirect } from "react-router-dom";

class ListarCheques extends React.Component {
  state = {
    loading: true,
    error: null,
    listaCheques: undefined,
    user: undefined,
    modificable: undefined
  };

  constructor(props) {
    super(props);
    this.modificarCheque = this.modificarCheque.bind(this);
    this.eliminarCheque = this.eliminarCheque.bind(this);
  }

  modificarCheque(cheque) {
    this.setState({
      modificable: cheque
    });
  }

  eliminarCheque = async ChequeNo => {
    console.log(ChequeNo);
    this.setState({
      loading: true
    });
    const cheque = {
      id: ChequeNo
    };
    try {
      await api.cheques.remove(cheque);
      this.fetchData();
      this.setState({
        loading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  transformDateToJS(lista) {
    lista.map(cheque => {
      let date = cheque.Fecha;
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);

      cheque.Fecha = year + "-" + month + "-" + day;

      return 0;
    });
  }

  fetchData = async () => {
    try {
      const listaCheques = await api.cheques.list(
        JSON.parse(sessionStorage.getItem("user"))
      );
      this.transformDateToJS(listaCheques);
      this.setState({ loading: false, listaCheques: listaCheques });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

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

    if (this.state.modificable !== undefined) {
      return (
        <Redirect
          to={{
            pathname: "/cheques/registrar",
            state: { cheque: this.state.modificable }
          }}
          cheque={this.state.modificable}
        />
      );
    }

    return (
      <div>
        <HeaderBar />
        <div className="container col-12">
          <div className="col-12">
            <div className="row header  mx-1 my-2">
              <div className="col col-sm-12 col-md-6 col-lg-2 ">
                <Link to="/cheques/registrar">
                  <button
                    type="button btn-agregar"
                    className="form-control btn-success"
                  >
                    Agregar Cheque
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row chequera mx-1 my-2 col-12 ">
            {this.state.listaCheques.map(cheque => {
              i++;

              return (
                <div
                  className=" row cheque mx-2 mb-3 col-sm-12 col-md-5 col-lg-3"
                  key={i - 1}
                >
                  <div className="row col-sm-12">
                    <div className="col col-sm-6"># Cheque</div>
                    <div className="col col-sm-6" name="numCheque">
                      {cheque.ChequeNo}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Cuenta</div>
                    <div className="col col-sm-6" name="cuenta">
                      {cheque.Cuenta}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Fecha</div>
                    <div className="col col-sm-6" name="fechaCheque">
                      {cheque.Fecha}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Nombre</div>
                    <div className="col col-sm-6" name="nombre">
                      {cheque.Nombre}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Valor</div>
                    <div className="col col-sm-6" name="valor">
                      {cheque.Valor}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Concepto</div>
                    <div className="col col-sm-6" name="concepto">
                      {cheque.Concepto}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <div className="col col-sm-6">Rubro</div>
                    <div className="col col-sm-6" name="rubro">
                      {cheque.Rubro}
                    </div>
                  </div>
                  <div className="row col-sm-12">
                    <button
                      type="button"
                      onClick={() => {
                        this.modificarCheque(cheque);
                      }}
                      className="form-control btn-info "
                    >
                      Modifcar
                    </button>
                  </div>
                  <div className="row col-sm-12 my-1">
                    <button
                      type="button"
                      onClick={() => {
                        this.eliminarCheque(cheque.ChequeNo);
                      }}
                      className="form-control btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ListarCheques;
