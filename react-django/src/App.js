import './App.css';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Home } from "./home";
import { Proyecto } from "./proyecto";
import { Sitio } from "./sitio";
import { Usuario } from "./usuario";
function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-">
        React-Django Frontend
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/home">Inicio</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/proyectos">Proyecto</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/sitios">Sitios</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/usuarios">Usuarios</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/home"  component={Home} />
        <Route path="/proyectos"  component={Proyecto} />
        <Route path="/sitios"  component={Sitio} />
        <Route path="/usuarios"  component={Usuario} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
