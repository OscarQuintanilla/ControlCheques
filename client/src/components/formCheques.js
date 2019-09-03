import React from 'react';
import '../pages/styles/Login.css';

class FormCheques extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <form onSubmit={this.props.onSubmit}>
                        <div className="form-group">
                            <label>Cuenta</label>
                            <input className="form-control" type="text" name="Cuenta" value={this.props.formValues.Cuenta} onChange={this.props.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Número de Cheque</label>
                            <input className="form-control" type="text" name="ChequeNo" value={this.props.formValues.ChequeNo} onChange={this.props.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Fecha del Cheque</label>
                            {/* <input className="form-control" type="email" name="Fecha" value={this.props.formValues.Fecha} onChange={this.props.onChange} /> */}
                            <input type="date" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input className="form-control" type="text" name="Nombre" value={this.props.formValues.Nombre} onChange={this.props.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Valor</label>
                            <input className="form-control" type="text" name="Valor" value={this.props.formValues.Valor} onChange={this.props.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Concepto</label>
                            <input className="form-control" type="text" name="Concepto" value={this.props.formValues.Concepto} onChange={this.props.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Rubro</label>
                            <select className="form-control" value={this.props.formValues.Rubro} name="Rubro" onChange={this.props.onChange} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" > {this.props.modificando ? "Modificar Cheque" : "Registrar Cheque"} </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormCheques;