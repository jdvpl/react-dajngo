import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Proyecto } from "./proyecto";
import  Home  from "./components/home";
import { Sitio } from "./sitio";
import { Usuario } from "./usuario";
import { Lenguaje } from "./lenguajes";
import { Databases } from "./databases";
function App() {
  return (
    <BrowserRouter>
    <div className="App container">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <NavLink className="navbar-brand font-weight-bold" to="/">JDVPL</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse mr-auto" id="navbarNav">
        <ul className="navbar-nav ml-auto">

          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/proyectos">Proyecto</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/sitios">Sitios</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/usuarios">Usuarios</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/lenguajes">Lenguajes</NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/databases">DB</NavLink>
          </li>
        </ul>
        </div>
        </div>
      </nav>
      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/proyectos"  component={Proyecto} />
        <Route exact path="/sitios"  component={Sitio} />
        <Route exact path="/usuarios"  component={Usuario} />
        <Route exact path="/lenguajes"  component={Lenguaje} />
        <Route exact path="/databases"  component={Databases} />
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
