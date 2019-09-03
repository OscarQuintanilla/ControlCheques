import React from 'react';
import FormLogin from '../components/FormLogin';
import "./styles/Login.css";
import api from '../api';
import { Redirect } from "react-router-dom";
import PageLoading from "../components/PageLoading";

class Login extends React.Component {

    state = {
        form: {
            Dealer: "",
            password: "",
        },
        data: undefined,
        error: null,
        loading: false,
        user: undefined,
    }

    componentDidMount() {

    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        try {
            const response = await api.sesion.login(this.state.form);
            if (response.length > 0 && response[0].Dealer !== undefined) {
                sessionStorage.setItem('user', JSON.stringify(response[0]));
                this.setState({
                    user: sessionStorage.getItem('user'),
                    loading: false,
                });
            } else {
                this.setState({ loading: false });
            }
        } catch (error) {
            console.log(error);
            this.setState({
                loading: false,
            })
        }
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    render() {
        if (this.state.loading === true) {
            return <PageLoading />
            }

        if (this.state.user !== undefined) {
            return <Redirect to='/cheques/listar' />
        }

        return (
            <div className="box">
                <div className="row">
                    <div className="col col-sm-1 col-md-1 col-lg-4"></div>
                    <div className="col col-sm-10 col-lg-4">
                        <FormLogin
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            formValues={this.state.form}
                        />
                    </div>

                </div>

            </div>
        );
    }
}

export default Login;