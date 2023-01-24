import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

import fondo2 from "../../img/fondo2.jpg";
import { RiLockPasswordFill } from "react-icons/ri";

import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const OlvidoPassword = () => {
  const { actions, store } = useContext(Context);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [isEmail, setIsEmail] = useState();
  const [nwpass, setNwpass] = useState(false);
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
    if (!isCaptcha) {
      setIsEmail("Debe verificar si es humano");
      return false;
    }
    const url = "/api/new_pass";
    const method = "POST";
    const head = { "Content-Type": "application/json", 'Authorization': 'Bearer '+token };
    //console.log(email, password)
   
    await actions.solicitudesAPI(url, method, head, data);
    //console.log(store.message)
    if (store.message) {
      setIsEmail(store.message);
      store.message = null;
      setNwpass(false);
    } else {
      
      setNwpass(true);
      
    }
    
  };

  return (
    <div className="login-body" style={{ backgroundColor:"#fdefbc",height:"90vh" }}>
      <h1 className="modificaActividad_header mb-4">Recupera tu contraseña</h1>
      <div
        className="container login_espacio border border-white rounded px-0"
        style={{
          height: "auto",
          width: "470px",
          backgroundColor:"#fce38a",
        }}
      >
        
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login_icon">
            <RiLockPasswordFill color="#E14D2A" fontSize="2.5em" />
          </h1>
          <div>
            <HCaptcha sitekey={process.env.HCAPTCHA} onVerify={onVerify} />
          </div>
          <div>
            <span className="signup_email_valido">{isEmail}</span>
          </div>
          {nwpass ? <div><h6>Contraseña enviada</h6></div> : ""}
          <div className="login_email">
            <i className="fa fa-envelope login_icono_email"></i>
            <input
              className="login_input"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
            />
            {errors.email && (
              <span className="signup_password_coincide">
                EL EMAIL NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <p></p>

          <div className="container login_button_body px-0">
            <button className="userhome_home mt-3" type="submit">
              <div className="userhome_iconos">
                <i className="fas fa-lock userhome_icono_default"></i>
                <i className="fas fa-lock-open userhome_icono_hover"></i>
              </div>
              Recuperar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
