import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FormCheques from '../components/formCheques';
import api from '../api';

class InsertarCheques extends React.Component {
    user = JSON.parse(sessionStorage.getItem('user'));

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
            Rubro: 1,
            Linea: 1,
            Proveedor: "", //Blanco
            OrdenCompra: 0,
            MarcaAnticipo: 0,
            SaldoAnticipo: 0,
            SolicitadoPor: "",  //Blanco
            FechaCobro: "", //1/1/1991
        },
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.cheques.create(this.state.form);
        } catch (error) {

        }
    }

    render() {




        return (
            <div>
                <HeaderBar />
                <br />
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8 center">
                        <FormCheques
                            formValues={this.state.form}
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default InsertarCheques;
