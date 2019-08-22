import React from 'react';

class FormLogin extends React.Component {

    sub = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <center>
                            <h1>ElyteSoft</h1>
                        </center>

                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.props.onSubmit} >
                            <div className="form-group">
                                <label>Dealer</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="Dealer"
                                    onChange={this.props.onChange}
                                    value={this.props.formValues.Dealer}
                                />
                            </div>
                            <div className="form-group" disabled>
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="password"
                                    onChange={this.props.onChange}
                                    value={this.props.formValues.password}
                                    disabled
                                />
                            </div>
                            <button className="btn btn-success">Iniciar Sesión</button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default FormLogin;