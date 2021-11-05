import React,{Component} from "react";
import {variables} from './Variables.js';
export class Sitio extends Component{
    constructor(props) {
        super(props);

        this.state={
            sitios:[],
            proyectos:[],
            usuarios:[],
            lenguajes:[],
            modalTitle:[],
            SitioId:0,
            SitioNombre:"",
            SitioDescripcion:"",
            Proyecto:"",
            Usuario:"",
            SitioHosting:"",
            SitioDb:"",
            SitioLenguajes:"",
        }
    }

    refreshList() {
        fetch(variables.API_URL+'sitio')
        .then(response => response.json())
        .then(data =>{
            this.setState({sitios:data})
        });
        fetch(variables.API_URL+'lenguaje')
        .then(response => response.json())
        .then(data =>{
            this.setState({lenguajes:data})
        });
        fetch(variables.API_URL+'proyecto')
        .then(response => response.json())
        .then(data =>{
            this.setState({proyectos:data})
        });
        fetch(variables.API_URL+'usuario')
        .then(response => response.json())
        .then(data =>{
            this.setState({usuarios:data})
        });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeSitioNombre=(e)=>{
        this.setState({SitioNombre:e.target.value});
    }
    changeSitioDescripcion=(e)=>{
        this.setState({SitioDescripcion:e.target.value});
    }
    changeProyecto=(e)=>{
        this.setState({Proyecto:e.target.value});
    }
    changeUsuario=(e)=>{
        this.setState({Usuario:e.target.value});
    }
    changeSitioHosting=(e)=>{
        this.setState({SitioHosting:e.target.value});
    }
    changeSitioDb=(e)=>{
        this.setState({SitioDb:e.target.value});
    }
    changeSitioLenguajes=(e)=>{
        this.setState({SitioLenguajes:e.target.value});
    }
    // metodo para agregar
    addClick(){
        this.setState({
            modalTitle:"Agregar Sitio",
            SitioId:0,
            SitioNombre:"",
            SitioDescripcion:"",
            Proyecto:"",
            Usuario:"",
            SitioHosting:"",
            SitioDb:"",
            SitioLenguajes:"",
        });
    }
    // metodo para editart
    editClick(pro){
        this.setState({
            modalTitle:"Editar sitio",
            SitioId:pro.SitioId,
            SitioNombre:pro.SitioNombre,
            SitioDescripcion:pro.SitioDescripcion,
            Proyecto:pro.Proyecto,
            Usuario:pro.Usuario,
            SitioHosting:pro.SitioHosting,
            SitioDb:pro.SitioDb,
            SitioLenguajes:pro.SitioLenguajes,
        });
    }
    // crear un nuevo proyecto
    createClick(){
        fetch(variables.API_URL+'sitio',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SitioNombre:this.state.SitioNombre,
                SitioDescripcion:this.state.SitioDescripcion,
                Proyecto:this.state.Proyecto,
                Usuario:this.state.Usuario,
                SitioHosting:this.state.SitioHosting,
                SitioDb:this.state.SitioDb,
                SitioLenguajes:this.state.SitioLenguajes,
            })
        })
        .then(res => res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert("Fallo al insertar sitio")
        })
    }
    // crear un nuevo proyecto
    updateClick(){
        fetch(variables.API_URL+'sitio',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SitioId:this.state.SitioId,
                SitioNombre:this.state.SitioNombre,
                SitioDescripcion:this.state.SitioDescripcion,
                Proyecto:this.state.Proyecto,
                Usuario:this.state.Usuario,
                SitioHosting:this.state.SitioHosting,
                SitioDb:this.state.SitioDb,
                SitioLenguajes:this.state.SitioLenguajes,
            })
        })
        .then(res => res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert("Fallo al insertar")
        })
    }
    // crear un nuevo proyecto
    deleteClick(id){
        if(window.confirm("Estas seguro de borrarlo")){
        fetch(variables.API_URL+'sitio/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert("Fallo al insertar")
        })
    }
    }
    render() {
        const {sitios,modalTitle,
            SitioId,
            SitioNombre,
            SitioDescripcion,
            Proyecto,
            Usuario,
            SitioHosting,
            SitioDb,
            SitioLenguajes,
            lenguajes,
proyectos,
usuarios,
        } = this.state;
        return (
            <div>
            <div className="d-flex flex-row-reverse bd-highlight">

            <button type="button" className="btn btn-dark m-2 float-right"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.addClick()} >
                Agregar
            </button>
            </div>
                <h3 className="text-center">Pagina de Sitio</h3>
            <div className="table-responsive m-auto">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sitio</th>
                            <th>Descripcion</th>
                            <th>Proyecto</th>
                            <th>Usuario</th>
                            <th>SitioHosting</th>
                            <th>SitioDb</th>
                            <th>SitioLenguajes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sitios.map(pro=>
                            <tr key={pro.SitioId}>
                                <td>{pro.SitioId}</td>    
                                <td>{pro.SitioNombre}</td>    
                                <td>{pro.SitioDescripcion}</td>
                                <td>{pro.Proyecto}</td>
                                <td>{pro.Usuario}</td>
                                <td>{pro.SitioHosting}</td>
                                <td>{pro.SitioDb}</td>
                                <td>{pro.SitioLenguajes}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(pro)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        onClick={() => this.deleteClick(pro.SitioId)}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
</div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalTitle}
                                </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 text-left">
                                    <label htmlFor="message-text" className="col-form-label">Nombre del Sitio:</label>
                                    <input type="text" className="form-control" value={SitioNombre} onChange={this.changeSitioNombre}/>
                                    {/* proyecto */}
                                    <label htmlFor="message-text" className="col-form-label">Proyecto:</label>
                                    <select onChange={this.changeProyecto}  value={Proyecto} className="form-select" >
                                                {proyectos.map(pro=><option key={pro.ProyectotId} value={pro.ProyectoNombre}>
                                        {pro.ProyectoNombre}
                                    </option>)}
                                    </select>
                                    {/* usuario */}
                                    <label htmlFor="message-text" className="col-form-label">Usuario:</label>
                                    <select onChange={this.changeUsuario}  value={Usuario} className="form-select" >
                                                {usuarios.map(usu=><option key={usu.UsuarioId} value={usu.UsuarioNombre}>
                                        {usu.UsuarioNombre}
                                    </option>)}
                                    </select>
                                    {/* SitioHosting */}
                                    <label htmlFor="message-text" className="col-form-label">Hosting:</label>
                                    <input type="text" className="form-control" value={SitioHosting} onChange={this.changeSitioHosting}/>
                                    {/* SitioDb */}
                                    <label htmlFor="message-text" className="col-form-label">DB:</label>
                                    <input type="text" className="form-control" value={SitioDb} onChange={this.changeSitioDb}/>
                                    {/* SitioDb */}
                                    <label htmlFor="message-text" className="col-form-label">Lenguajes:</label>
    
                                    <select onChange={this.changeSitioLenguajes}  value={SitioLenguajes} className="form-select" >
                                                {lenguajes.map(len=><option key={len.LenguajeId} value={len.LenguajeNombre}>
                                        {len.LenguajeNombre}
                                    </option>)}
                                    </select>
                                    {/* descripcion */}
                                    <label htmlFor="message-text" className="col-form-label">Descripcion del proyecto:</label>
                                    <textarea className="form-control" id="message-text" value={SitioDescripcion} onChange={this.changeSitioDescripcion}></textarea>
                                </div>
                                <div className="d-grid gap-2">
                                {SitioId===0?
                                <button type="button" className="btn btn-primary float-start btn-lg" onClick={() => this.createClick()}>Crear</button>
                                :null
                                }
                                {SitioId!==0?
                                <button type="button" className="btn btn-success float-start" onClick={() => this.updateClick()}>Editar</button>
                                :null
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}