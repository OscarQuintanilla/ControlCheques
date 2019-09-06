import React from "react";
import HeaderBar from "../components/HeaderBar";
import FormCheques from "../components/formCheques";
import api from "../api";
import PageLoading from "../components/PageLoading";
import { Redirect, Link } from "react-router-dom";
import "../pages/styles/InsertarCheques.css";

class InsertarCheques extends React.Component {
  user = JSON.parse(sessionStorage.getItem("user"));

  state = {
    form: {
      CodPais: this.user.CodPais, //Login
      Dealer: this.user.Dealer, //Login
      Tda: this.user.Tda, //Login
      Cuenta: "",
      ChequeNo: "",
      Fecha: "",
      Partida: "", // Blanco
      Nombre: "",
      Valor: "",
      Concepto: "",
      CargoCuenta: "", //Blanco
      Estatus: 1,
      Hecho: this.user.Nombre, //Login Nombre del Usuario
      Anular: 0,
      Rubro: 0,
      Linea: 1,
      Proveedor: "", //Blanco
      OrdenCompra: 0,
      MarcaAnticipo: 0,
      SaldoAnticipo: 0,
      SolicitadoPor: "", //Blanco
      FechaCobro: "" //1/1/1991
    },
    listaRubros: undefined,
    loading: false,
    redirect: false,
    modificando: false
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        form: this.props.location.state.cheque,
        modificando: true
      });
    }
  }

  transformDateToSQL(lista) {
    lista.map(cheque => {
      let date = cheque.Fecha;
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);

      cheque.Fecha = year + "-" + month + "-" + day;

      return 0;
    });
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    try {
      if (this.state.modificando === true) {
        console.log("modificando");
        await api.cheques.update(this.state.form);
        this.setState({
          loading: false,
          redirect: true
        });
      } else {
        await api.cheques.create(this.state.form);
        this.setState({
          loading: false,
          redirect: true
        });
      }
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }

    if (this.state.redirect === true) {
      return <Redirect to="/cheques/listar" />;
    }

    return (
      <div>
        <HeaderBar />
        <br />
        <div className="mb-4">
          <div className="col-12 centrar ">
            <Link to="/cheques/listar">
              <button className="btn btn-secondary col col-sm-12 col-md-6 col-lg-4 ">
                Regresar
              </button>
            </Link>
          </div>
        </div>
        <FormCheques
          formValues={this.state.form}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          modificando={this.state.modificando}
          rubros={this.state.listaRubros}
          user={this.state.form}
        />
      </div>
    );
  }
}

export default InsertarCheques;
