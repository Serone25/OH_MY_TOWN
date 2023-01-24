import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import fondo2 from "../../img/fondo2.jpg";
import { FaUserCircle } from "react-icons/fa";

import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form
import HCaptcha from '@hcaptcha/react-hcaptcha';


export const Login = () => {
  const { actions, store } = useContext(Context);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [isEmail, setIsEmail] = useState();

  const onVerify = (token) => {
    if (token) {
      setIsCaptcha(true);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form

  let login = false;
  const onSubmit = async (data, e) => {
    e.preventDefault();
    /*if (!isCaptcha) {
      setIsEmail("Debe verificar si es humano");
      return false;
    }*/
    const url = "/api/login";
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    //console.log(email, password)
    actions
      .solicitudesAPI(url, method, head, data)
      .then((el) => console.log("El resultado es;", el));
  };

  return (
    <div className="login-body" style={{ backgroundColor:"#fdefbc" }}>
      <h1 className="modificaActividad_header mb-4">Login</h1>
      <div
        className="container login_espacio rounded px-0"
        style={{
          height: "auto",
          width: "470px",
          backgroundColor:"#fce38a",
        }}
      >
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login_icon">
            <FaUserCircle color="#E14D2A" fontSize="2.5em" />
          </h1>
          <div>
            <HCaptcha
              sitekey={process.env.HCAPTCHA}
              onVerify={onVerify}
              
            />
          </div>
          <div className="login_email mb-4">
            <i className="fa fa-user login_icono_email"></i>
            <input
              className="login_input"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
            />
            {/* control de errores react-hook-form */}
            <br></br>
            <span className="signup_email_valido">{isEmail}</span>
            {errors.email && (
              <span className="mb-4 signup_password_coincide">
                EL EMAIL NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <div>
            <i className="fa fa-solid fa-lock login_icono_password"></i>
            <input
              className="login_input"
              autoComplete="off" //no permitir autocompletado del input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
            />
            {/* control de errores react-hook-form */}
            <br></br>
            {errors.password && (
              <span className="my-0 signup_password_coincide">
                EL PASSWORD NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <button className="userhome_home mt-3" type="submit">
            <div className="userhome_iconos">
              <i className="fas fa fa-user userhome_icono_default"></i>
              <i className="fas fa-check userhome_icono_hover"></i>
            </div>
              Login
          </button>
          
        </form>
      </div>
      <div className="login_email">{store.message}</div>
      <div className="login_registro">
        <p className="login_texto">
          Si no estás registrado pincha
          <Link to="/signup/">
            <span className="login_registro_link"> aquí</span>
          </Link>
        </p>
        <p className="login_texto">
          Si no recuerdas tu contraseña pincha
          <Link to="/fpass/">
            <span className="login_registro_link"> aquí</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
