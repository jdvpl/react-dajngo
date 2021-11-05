import React,{Component} from "react";
import {variables} from './Variables.js';
export class Databases extends Component{
    constructor(props) {
        super(props);

        this.state={
            databases:[],
            modalTitle:[],
            DatabaseId:0,
            DatabaseNombre:"",
            DatabaseDescripcion:""
            
        }
    }

    refreshList() {
        fetch(variables.API_URL+'db')
        .then(response => response.json())
        .then(data =>{
            this.setState({databases:data})
        });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeDatabaseNombre=(e)=>{
        this.setState({DatabaseNombre:e.target.value});
    }
    changeDatabaseDescripcion=(e)=>{
        this.setState({DatabaseDescripcion:e.target.value});
    }
    // metodo para agregar
    addClick(){
        this.setState({
            modalTitle:"Agregar base de datos",
            DatabaseId:0,
            DatabaseNombre:"",
            DatabaseDescripcion:""
        });
    }
    // metodo para editart
    editClick(db){
        this.setState({
            modalTitle:"Editar base de datos",
            DatabaseId:db.DatabaseId,
            DatabaseNombre:db.DatabaseNombre,
            DatabaseDescripcion:db.DatabaseDescripcion
        });
    }
    // crear un nuevo proyecto
    createClick(){
        fetch(variables.API_URL+'db',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DatabaseNombre:this.state.DatabaseNombre,
                DatabaseDescripcion:this.state.DatabaseDescripcion
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
        fetch(variables.API_URL+'db',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DatabaseId:this.state.DatabaseId,
                DatabaseNombre:this.state.DatabaseNombre,
                DatabaseDescripcion:this.state.DatabaseDescripcion
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
        fetch(variables.API_URL+'db/'+id,{
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
            alert("Fallo al eliminar la base de datos")
        })
    }
    }
    render() {
        const {databases,
            modalTitle,
            DatabaseId,
            DatabaseNombre,
            DatabaseDescripcion} = this.state;
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
                <h3 className="text-center">Pagina de Bases de datos</h3>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>BD</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {databases.map(db=>
                            <tr key={db.DatabaseId}>
                                <td>{db.DatabaseId}</td>    
                                <td>{db.DatabaseNombre}</td>    
                                <td>{db.DatabaseDescripcion}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(db)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        onClick={() => this.deleteClick(db.DatabaseId)}
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
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Nombre de la base de datos:</label>
                                    <input type="text" className="form-control" value={DatabaseNombre} onChange={this.changeDatabaseNombre}/>
                                    <label htmlFor="message-text" className="col-form-label">Descripcion de la base de datos:</label>
                                    <textarea className="form-control" id="message-text" value={DatabaseDescripcion} onChange={this.changeDatabaseDescripcion}></textarea>
                                </div>
                                <div className="d-grid gap-2">
                                {DatabaseId===0?
                                <button type="button" className="btn btn-primary float-start btn-lg" onClick={() => this.createClick()}>Crear</button>
                                :null
                                }
                                {DatabaseId!==0?
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