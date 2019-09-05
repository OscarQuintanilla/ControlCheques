import React from "react";
import "../pages/styles/Login.css";
import api from "../api";
import Loader from "../components/Loader";

class FormCheques extends React.Component {
  state = {
    listaRubros: undefined,
    loading: false
  };

  componentWillMount() {
    this.listarRubros();
  }

  listarRubros = async () => {
    console.log("se ehe");
    this.setState({
      loading: true
    });
    try {
      console.log(this.props.user.Dealer);
      const listaRubros = await api.cheques.getRubros({
        Dealer: this.props.user.Dealer
      });
      this.setState({ loading: false, listaRubros: listaRubros });
    } catch (error) {
      console.log("error en rubros");
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true) {
      return <Loader />;
    }
    return (
      <div className="row">
        <div className="col-6">
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Cuenta</label>
              <input
                className="form-control"
                type="text"
                name="Cuenta"
                value={this.props.formValues.Cuenta}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Número de Cheque</label>
              <input
                className="form-control"
                type="text"
                name="ChequeNo"
                value={this.props.formValues.ChequeNo}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha del Cheque</label>
              {/* <input className="form-control" type="email" name="Fecha" value={this.props.formValues.Fecha} onChange={this.props.onChange} /> */}

              <input
                type="date"
                className="form-control"
                name="Fecha"
                value={this.props.formValues.Fecha}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="Nombre"
                value={this.props.formValues.Nombre}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Valor</label>
              <input
                className="form-control"
                type="text"
                name="Valor"
                value={this.props.formValues.Valor}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Concepto</label>
              <input
                className="form-control"
                type="text"
                name="Concepto"
                value={this.props.formValues.Concepto}
                onChange={this.props.onChange}
              />
            </div>
            <div className="form-group">
              <label>Rubro</label>
              <select
                name="Rubro"
                className="form-control"
                value={this.props.formValues.Concepto}
                onChange={this.props.onChange}
              >
                {this.state.listaRubros.map((rubro, i) => {
                  return (
                    <option value={rubro.Codigo} key={i}>
                      {rubro.Descripcion}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">
              {this.props.modificando ? "Modificar Cheque" : "Registrar Cheque"}{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormCheques;
