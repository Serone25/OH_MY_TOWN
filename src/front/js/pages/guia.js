import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import opinion2 from "../../img/opinion2.jpg";
import { BsFillStarFill } from "react-icons/bs";

import "../../styles/guia.css";

export const Guia = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [guia, setGuia] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //cargando guias
  const [isLoading2, setIsLoading2] = useState(true); //cargando actividades

  const promesaGuias = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/usuario/" + params.theid));
    });
  };
  const promesaActividades = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/actividad_guia/" + params.theid));
    });
  };

  useEffect(() => {
    promesaGuias().then((datos) => {
      setGuia(datos);
      setIsLoading(false);
    });

    promesaActividades().then((datos) => {
      setActividades(datos);
      setIsLoading2(false);
    });
  }, []);

  if (isLoading || isLoading2) {
    return (
      <div className="tbody">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="guia-body">
      <div className="container">
        <div className="card mb-5">
          <div className="row g-0">
            <div className="col-md-2">
              <img src={guia.foto} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-10 cuerpo-guia-carta">
              <div className="card-body">
                <h1 className="card-title nombre-guia">{guia.nombre}</h1>
                <p className="card-text descripcion-guia">{guia.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
        <h5>ACTIVIDADES</h5>
        {guia.tipo === 1 ? (
          <div className="changeColor col-1">
            <Link to="/nueva_actividad">
              <span className="cart nav-link">Nueva actividad</span>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">
        
          {actividades.map((element) => (
            <div key={element.id} className="col">
              <Link to={"/actividades/" + element.id}>
                {" "}
                {/*Link a la pagina de actividades + index. Variable global en flux.js */}
                <div className="card h-100">
                  <img src={element.foto} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{element.nombre}</h5>
                    <p className="card-text">{element.ciudad}</p>
                    <p className="card-text">{element.precio}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
       

        <p>{store.comentarios[0].comentario}</p>
        <p>{store.comentarios[1].comentario}</p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

Guia.propTypes = {
  match: PropTypes.object,
};
