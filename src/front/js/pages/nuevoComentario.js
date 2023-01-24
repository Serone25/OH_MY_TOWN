import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/nuevoComentario.css";
import fondo2 from "../../img/fondo2.jpg";

export const NuevoComentario = () => {
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const { actions } = useContext(Context);
  useEffect(() => {
    if (!token) {
      return (
        <div className="login-body">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
    } else {
      actions.logIn();
    }
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data)
    const url = "/api/comen_new/" + params.theid + "/" + userid;
    const method = "POST";
    const head = { "Content-Type": "application/json", 'Authorization': 'Bearer '+token };

    const login = actions.solicitudesAPI(url, method, head, data);
    if (login) {
      window.location.href = "/reservas/" + userid;
    }
  };

  return (
    <div className="nuevoComentario_body" style={{ backgroundColor:"#fce38a" }}>
      <div
        className="container signup_espacio rounded px-0"
        style={{
          height: "auto",
          width: "400px",
          backgroundColor:"#fce38a",
        }}
      >
        <form className="nuevoComentario_form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="nuevoComentario_encabezado">NUEVO COMENTARIO</h2>

          <div id="input_username" className="nuevoComentario_comentario">
            <i className="fas fa-comment nuevoComentario_icono_comentario"></i>
            <textarea className="ps-5 nuevoComentario_areatexto" rows="10" cols="50"
              {...register("texto", { required: true })} //crear el name del input y requerido react-hook-form
            />
          </div>
          <div id="input_btn" className="pt-3">
            <button className="userhome_home" type="submit">
              <div className="userhome_iconos">
                <i className="fas fa-pen userhome_icono_default"></i>
                <i className="fas fa-check userhome_icono_hover"></i>
              </div>
              {" "}
              COMENTAR
            </button>
          </div>

          {/* control de errores react-hook-form */}
          {errors.texto && (
            <span className="signup_password_coincide">
              EL TEXTO NO PUEDE ESTAR VACIO
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
