import React from 'react';
import './styles/HeaderBar.css';
import { Link, Redirect } from "react-router-dom";

class HeaderBar extends React.Component {

  state = {
    user: "",
    
  }



  cerrarSesion = e => {
    e.preventDefault();
    sessionStorage.removeItem('user');
    this.setState({
      user: undefined,
    })

  }

  componentDidMount() {
    this.setState({
      user: sessionStorage.getItem('user'),
    });
  }

  render() {
    if (this.state.user === undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Navbar">
        <div className="row ml-3">
          <div className="col-10">
            <Link to="/" className="Navbar__brand" >
              <span className="font-weight-strong">Elyte</span>
              <span className="font-weight-light">Soft</span>
            </Link>
          </div>
          <div className="sub col-2">
            <span onClick={this.cerrarSesion} className="font-weight-light">Cerrar Sesión</span>
          </div>
        </div>

      </div>
    );
  }
}

export default HeaderBar;