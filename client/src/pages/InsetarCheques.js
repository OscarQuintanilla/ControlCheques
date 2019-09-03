import React from 'react';
import HeaderBar from '../components/HeaderBar';
import FormCheques from '../components/formCheques';
import api from '../api';
import PageLoading from '../components/PageLoading';
import { Redirect, Link } from "react-router-dom";

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
        loading: false,
        redirect: false,
        modificando: false,
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                form: this.props.location.state.cheque,
                modificando: true,
            });
        }
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({
            loading: true,
        })
        try {
            if (this.state.modificando === true) {
                console.log('modificando');
                await api.cheques.update(this.state.form);
                this.setState({
                    loading: false,
                    redirect: true,
                });
            } else {
                await api.cheques.create(this.state.form);
                this.setState({
                    loading: false,
                    redirect: true,
                });
            }

        } catch (error) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {

        if (this.state.loading === true) {
            return <PageLoading />
        }

        if (this.state.redirect === true) {
            return <Redirect to="/cheques/listar" />
        }

        return (
            <div>
                <HeaderBar />
                <br />
                <div className="row mb-4">
                    <div className="col-4"></div>
                    <div className="col-8 center">
                        <Link to="/cheques/listar" ><button className="btn btn-secondary">Regresar</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8 center">
                        <FormCheques
                            formValues={this.state.form}
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}
                            modificando={this.state.modificando}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default InsertarCheques;
