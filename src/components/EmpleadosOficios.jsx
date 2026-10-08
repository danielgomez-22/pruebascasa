import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';


export default class EmpleadosOficios extends Component {

    // 1. Referencia para capturar qué opción seleccionó el usuario en el <select>
    selecOficio = React.createRef();

    // 2. Estado inicial: variables que, al cambiar, repintan la pantalla
    state = {
        oficios: [],
        empleados: []
    }

    // Metodo Get que le hace a la API para traer los oficios
    loadOficios = () => {

        //para que se una a la url y complete 
        let request = "api/empleados";

        //para coger datos de la api para eso se usa axios
        axios.get(Global.urlApiEmpleados + request).then((response) => {

            // response.data contiene el Array de empleados devuelto por la API
            // Extraemos solo los oficios únicos (sin duplicados)
            let aux = [...new Set(response.data.map(elem => elem.oficio))];

            //actualizamos el estado con la lista de oficios
            this.setState({
                oficios: aux
            });
        });
    }

    // esto se hace para buscar la seccion de empleados de la api 
    // tiene que tener el event porqueva enlazado a un boton
    buscarEmpleados = (event) => {
        event.preventDefault();

        // esto sirve para que la opcion qeu se coja en el select se convierta en la activa
        let oficioSeleccionado = this.selecOficio.current.value;

        //request para que coja bien la api
        let request = "api/empleados/empleadosoficio/" + oficioSeleccionado;

        //esto sirve para que coja los datos de los emppleados, los recorre y los muestra con response.data 
        // que data es le valor del array que nos da la api por defecto
        // en algunas puede haber data.algo que es el siguiente nombre del array 
        axios.get(Global.urlApiEmpleados + request).then((response) => {
            console.log("Datos recibidos de la API:", response.data);
            this.setState({
                empleados: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadOficios();
    }

    render() {
        return (
            <div>
                <h1> practica de examen </h1>

                <form>
                    <label>seleccion un oficio</label>
                    <select ref={this.selecOficio}>
                        { // hacemos un select que recorra oficios y que nos muestre mediante un return con sus options
                            // oficio y index pueden ser inventados, pero index que es el que dice las posiciones debe estar siempre el segundo
                            this.state.oficios.map((oficio, index) => {
                                return(
                                    <option key={index} value={oficio}>{oficio}</option>
                                )
                            })
                        }
                    </select>
                    {/*el boton este conecta con la funcion arriba buscar empleados */}
                    <button onClick={this.buscarEmpleados}>Buscar Empleados</button>
                    <hr/>
                    {/* tabla normal para los encabezzados */}
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Oficio</th>
                                <th>Salario</th>
                            </tr>
                        </thead>
                        {/* en la tabla recorre los empleados de la api y como hemos puesto emp pues es emp.NOMBRE DEL APARTADO EN API */}
                        <tbody>
                            {this.state.empleados.map((emp, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{emp.apellido}</td>
                                        <td>{emp.oficio}</td>
                                        <td>{emp.salario}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    
                </form>
            </div>
        )
    }
}
