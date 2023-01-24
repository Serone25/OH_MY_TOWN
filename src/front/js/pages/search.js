import React, {useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

import "../../styles/search.css";
import fondo3 from "../../img/fondo3.jpg"
import leon from "../../img/leon.jpg"

import { Link, useParams } from "react-router-dom";

export const Search = () => {
	const parseFecha = (datos) => {
		let options = {
		  weekday: "long",
		  year: "numeric",
		  month: "long",
		  day: "numeric",
		  hour: "2-digit",
		  minute: "2-digit",
		};
		let fecha = new Date(datos);
		fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
		let fechaF = fecha.toLocaleDateString("es", options);
		let fechaD = fechaF.charAt(0).toUpperCase() + fechaF.slice(1);
		return fechaD;
	  };
	const { actions } = useContext(Context);

	const [tarea, setTarea] = useState([]);					//renderizado dinamico
	const [listaTareas, setListaTareas] = useState([]);		//renderizado estatico
	const [busqueda, setBusqueda] = useState("");			//escritura


	useEffect(() => {
		const promesaActividades = () => {
			return new Promise((resolve, reject) => {
				resolve(actions.dataFromAPI('/api/search')) 
			})
		}
		promesaActividades().then((datos) => { 
			setListaTareas(datos)
			setTarea(datos)
		}
		)
	},[])

	const handleChange = (e) =>{
		setBusqueda(e.target.value)
		filterTable(e.target.value);
	}

	const filterTable = (ciudad) =>{
		var resultado = listaTareas.filter((element) =>{
			if(element.ciudad.toString().toLowerCase().includes(ciudad.toLowerCase())){
				return element;
			}
		})
		setTarea(resultado)
	}

	return (
		<div className="d-flex justify-content-center search_body" style={{ backgroundColor:"#fce38a"}}>
			<div className="barra_search">
				<h1 className="barra_search_encabezado">¿ A <span className="barra_search_viajar">DÓNDE</span> VAS A <span className="barra_search_viajar">VIAJAR </span>?</h1>
				<div className="containerInput container-fluid">
					<i className="fa fa-search search_icono_search"></i>
					<input className="barra_search_input"
						value = {busqueda}
						placeholder = "Busca tu ciudad"
						onChange={handleChange}
					/>
				</div>
					
				<div className="row row-cols-1 row-cols-md-3 g-4">{tarea.map((element,index) =>
					<div key={element.id} className="col">
						<div className="card h-100 search_carta">
      						<div className="card-body search_carta_body">
								<div>
									<h5 className="card-title search_h5">{element.nombre}</h5>
									<p className="card-text search_fecha"><i className="far fa-clock pe-2"></i>{element.fecha}</p>
								</div>
      						</div>
						<Link to={"/actividades/"+ element.id}>
							<div className="">
								<img className="img-fluid search_carta_imagen" src={process.env.BACKEND_URL + "/" + element.foto}
									alt="" />
							</div>
						</Link>
							<div className="" > {/*{`id${todo.id}`}*/}
								<button className="btn p-md-1 my-2 search_carta_boton" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
									aria-expanded="false" aria-controls="collapseExample">Leer más
								</button>
								<div className="collapse" id={"collapseExample"}>
									<div className="card card-body search_carta_parrafo">
										{element.descripcion}
									</div>
								</div>
								
							</div>
    					</div>,
						{/*<div className="box">
            				/*<div className="cuerpo">
								<div className="imgContainer">
									<div className = "titulo_container">
										<h2 className="text-white fs-3">{element.nombre}</h2>
									</div>
									<div>{parseFecha(element.fecha)}</div>
                    				<img src={process.env.BACKEND_URL + "/" + element.foto} alt=""/>
									<div className = "precio_container">
										<h2 className= "text-white fs-3">{element.precio}</h2>
									</div>
								</div>
                				<div className="content d-flex flex-column align-items-center justify-content-center">
									<div>
										<h3 className="text-white fs-5">{element.ciudad}</h3>
									</div>
                				</div>
							</div>
						</div>*/}
					</div>	
				)}</div>
			</div>
		</div>
	);
};