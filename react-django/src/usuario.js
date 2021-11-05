import React,{Component} from "react";
import {variables} from './Variables.js';
export class Usuario extends Component{
    constructor(props) {
        super(props);

        this.state={
            proyectos:[],
            usuarios:[],
            lenguajes:[],
            modalTitle:[],
            UsuarioId:0,
            UsuarioNombre:"",
            Proyecto:"",
            Fecha_Created:"",
            Lenguajes:"",
            PhotoFileName:"default.png",
            PhotoPath:variables.PHOTO_URL,

            
        }
    }

    refreshList() {
        fetch(variables.API_URL+'usuario')
        .then(response => response.json())
        .then(data =>{
            this.setState({usuarios:data})
        });
        fetch(variables.API_URL+'proyecto')
        .then(response => response.json())
        .then(data =>{
            this.setState({proyectos:data})
        });
        fetch(variables.API_URL+'lenguaje')
        .then(response => response.json())
        .then(data =>{
            this.setState({lenguajes:data})
        });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeUsuarioNombre=(e)=>{
        this.setState({UsuarioNombre:e.target.value});
    }
    changeProyecto=(e)=>{
        this.setState({Proyecto:e.target.value});
    }
    changeFecha_Created=(e)=>{
        this.setState({Fecha_Created:e.target.value});
    }
    changeLenguajes=(e)=>{
        this.setState({Lenguajes:e.target.value});
    }
    // metodo para agregar
    addClick(){
        this.setState({
            modalTitle:"Agregar Usuario",
            UsuarioId:0,
            UsuarioNombre:"",
            Proyecto:"",
            Fecha_Created:"",
            Lenguajes:"",
            PhotoFileName:"default.png",
        });
    }
    // metodo para editart
    editClick(emp){
        this.setState({
            modalTitle:"Editar Usuario",
            UsuarioId:emp.UsuarioId,
            UsuarioNombre:emp.UsuarioNombre,
            Proyecto:emp.Proyecto,
            Fecha_Created:emp.Fecha_Created,
            Lenguajes:emp.Lenguajes,
            PhotoFileName:emp.PhotoFileName,
        });
    }
    // crear un nuevo proyecto
    createClick(){
        fetch(variables.API_URL+'usuario',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UsuarioNombre:this.state.UsuarioNombre,
                Proyecto:this.state.Proyecto,
                Fecha_Created:this.state.Fecha_Created,
                Lenguajes:this.state.Lenguajes,
                PhotoFileName:this.state.PhotoFileName,
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
    updateClick(){
        fetch(variables.API_URL+'usuario',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UsuarioId:this.state.UsuarioId,
                UsuarioNombre:this.state.UsuarioNombre,
                Proyecto:this.state.Proyecto,
                Fecha_Created:this.state.Fecha_Created,
                Lenguajes:this.state.Lenguajes,
                PhotoFileName:this.state.PhotoFileName,
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
        fetch(variables.API_URL+'usuario/'+id,{
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

    imageUpload=(e)=>{
        e.preventDefault();
        const formData =new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);
        fetch(variables.API_URL+'usuario/savefile',{
            method:'POST',
            body:formData
        })
        .then(res => res.json())
        .then(data=>{
            this.setState({PhotoFileName:data})
        })
    }
    render() {
        const {proyectos,
            lenguajes,
            modalTitle,
            usuarios,
            UsuarioId,
            UsuarioNombre,
            Proyecto,
            Fecha_Created,
            Lenguajes,
            PhotoFileName,
            PhotoPath    
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
                <h3>Pagina de Proyecto</h3>
                <div className="table-responsive m-auto">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>UsuarioId</th>
                            <th>UsuarioNombre</th>
                            <th>Proyecto</th>
                            <th>Lenguajes</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(emp=>
                            <tr key={emp.UsuarioId}>
                                <td>{emp.UsuarioId}</td>    
                                <td>{emp.UsuarioNombre}</td>    
                                <td>{emp.Proyecto}</td>
                                <td>{emp.Lenguajes}</td>
                                <td>{emp.Fecha_Created}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(emp)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        onClick={() => this.deleteClick(emp.UsuarioId)}
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
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalTitle}
                                </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Nombre del Usuario:</label>
                                            <input type="text" className="form-control" value={UsuarioNombre} onChange={this.changeUsuarioNombre}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Proyecto:</label>
                                            <select onChange={this.changeProyecto}  value={Proyecto} className="form-select">
                                                {proyectos.map(dep=><option key={dep.ProyectotId} value={dep.ProyectoNombre}>
                                                    {dep.ProyectoNombre}
                                                </option>)}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Fecha:</label>
                                            <input type="date" className="form-control" value={Fecha_Created} onChange={this.changeFecha_Created}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Lenguajes:</label>
                                            <select onChange={this.changeLenguajes}  value={Lenguajes} className="form-select">
                                                {lenguajes.map(len=><option key={len.LenguajeId} value={len.LenguajeNombre}>
                                                    {len.LenguajeNombre}
                                                </option>)}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px" src={PhotoPath+PhotoFileName} alt={PhotoFileName} />
                                        <input className="m-2" type="file" onChange={this.imageUpload}/>
                                    </div>
                                        
                                </div>
                                <div className="d-grid gap-2">
                                        {UsuarioId===0?
                                        <button type="button" className="btn btn-primary float-start btn-lg" onClick={() => this.createClick()}>Crear</button>
                                        :null
                                        }
                                        {UsuarioId!==0?
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