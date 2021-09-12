import React,{Component} from "react";
import {variables} from './Variables.js';
export class Proyecto extends Component{
    constructor(props) {
        super(props);

        this.state={
            proyectos:[],
            modalTitle:[],
            ProyectotId:0,
            ProyectoNombre:"",
            ProyectoDescripcion:""
            
        }
    }

    refreshList() {
        fetch(variables.API_URL+'proyecto')
        .then(response => response.json())
        .then(data =>{
            this.setState({proyectos:data})
        });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeProyectoNombre=(e)=>{
        this.setState({ProyectoNombre:e.target.value});
    }
    changeProyectoDescripcion=(e)=>{
        this.setState({ProyectoDescripcion:e.target.value});
    }
    // metodo para agregar
    addClick(){
        this.setState({
            modalTitle:"Agregar proyecto",
            ProyectotId:0,
            ProyectoNombre:"",
            ProyectoDescripcion:""
        });
    }
    // metodo para editart
    editClick(pro){
        this.setState({
            modalTitle:"Editar proyecto",
            ProyectotId:pro.ProyectotId,
            ProyectoNombre:pro.ProyectoNombre,
            ProyectoDescripcion:pro.ProyectoDescripcion,
        });
    }
    // crear un nuevo proyecto
    createClick(){
        fetch(variables.API_URL+'proyecto',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProyectoNombre:this.state.ProyectoNombre,
                ProyectoDescripcion:this.state.ProyectoDescripcion
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
        fetch(variables.API_URL+'proyecto',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProyectotId:this.state.ProyectotId,
                ProyectoNombre:this.state.ProyectoNombre,
                ProyectoDescripcion:this.state.ProyectoDescripcion
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
        fetch(variables.API_URL+'proyecto/'+id,{
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
        const {proyectos,modalTitle,
            ProyectotId,
            ProyectoNombre,
            ProyectoDescripcion} = this.state;
        return (
            <div>
            <button type="button" className="btn btn-dark m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.addClick()} >
                Agregar
            </button>
                <h3>Pagina de Proyecto</h3>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Proyecto</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map(pro=>
                            <tr key={pro.ProyectotId}>
                                <td>{pro.ProyectotId}</td>    
                                <td>{pro.ProyectoNombre}</td>    
                                <td>{pro.ProyectoDescripcion}</td>
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
                                        onClick={() => this.deleteClick(pro.ProyectotId)}
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

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalTitle}
                                </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Nombre del proyecto:</label>
                                    <input type="text" className="form-control" value={ProyectoNombre} onChange={this.changeProyectoNombre}/>
                                    <label for="message-text" className="col-form-label">Descripcion del proyecto:</label>
                                    <textarea class="form-control" id="message-text" value={ProyectoDescripcion} onChange={this.changeProyectoDescripcion}></textarea>
                                </div>
                                <div className="d-grid gap-2">
                                {ProyectotId===0?
                                <button type="button" className="btn btn-primary float-start btn-lg" onClick={() => this.createClick()}>Crear</button>
                                :null
                                }
                                {ProyectotId!==0?
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