import React from 'react';

class BadgeCheque extends React.Component {

  state = {
    cuenta: "",
    numCheque: "",
    fechaCheque: "",
    nombre: "",
    valor: "",
    concepto: "",
    rubro: "",
  }
  
  render() {
    console.log(this.props.cheque);
    return (
      <div className="row">
        <div className="col" name="cuenta"  >a</div>
        <div className="col" name="numCheque"  >a</div>
        <div className="col" name="fechaCheque"  >a</div>
        <div className="col" name="nombre"  >a</div>
        <div className="col" name="valor"  >a</div>
        <div className="col" name="concepto"  >a</div>
        <div className="col" name="rubro"  >a</div>
      </div>
      // <div className="row">
      //   <div className="col" name="cuenta" value={this.props.cheque.cuenta} ></div>
      //   <div className="col" name="numCheque" value={} >a</div>
      //   <div className="col" name="fechaCheque" value={} >a</div>
      //   <div className="col" name="nombre" value={} >a</div>
      //   <div className="col" name="valor" value={} >a</div>
      //   <div className="col" name="concepto" value={} >a</div>
      //   <div className="col" name="rubro" value={} >a</div>
      // </div>
    )
  }

}

export default BadgeCheque;