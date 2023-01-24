import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form
import HCaptcha from '@hcaptcha/react-hcaptcha';

import "../../styles/signup.css";
import { FaRegEdit } from "react-icons/fa";
import fondo2 from "../../img/fondo2.jpg";
import { element } from "prop-types";

export const FormSignup = () => {
  const { actions, store } = useContext(Context);
  const [isEmail, setIsEmail] = useState();
  const [isCaptcha, setIsCaptcha] = useState(false);
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

  const [errPass, setErrPass] = useState(false);
  const onSubmit = async (data, e) => {
    if (!isCaptcha) {
      setIsEmail("Debe verificar si es humano");
      return false;
    }
    e.preventDefault();
    // console.log(data)
    const valido = await actions.verifyEmail(data.email);

    var obj = store.verifica;
    var key = "errors";
    var hasKey = key in obj;
    if (hasKey) {
      setIsEmail("Email no válido");
      store.verifica = null;
    } else {
      const url = "/api/new_user";
      const method = "POST";
      const head = { "Content-Type": "application/json" };
      if (data.password !== data.passwordR) {
        setErrPass(true);
      } else {
        const login = actions.solicitudesAPI(url, method, head, data);
        if (login) {
          window.location.href = "/login";
        }
      }
    }
  };

  return (
    <div className="signup-body" style={{ backgroundColor:"#fdefbc" }}>
      <h1 className="modificaActividad_header mb-4">Registro</h1>
      <div
        className="container signup_espacio rounded px-0"
        style={{
          height: "auto",
          width: "470px",
          backgroundColor:"#fce38a",
        }}
      >
        <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
          <h1 className="login_icon">
            <FaRegEdit color="#E14D2A" fontSize="2.5em" />
          </h1>
            <HCaptcha
              sitekey={process.env.HCAPTCHA}
              onVerify={onVerify}
            />
          </div>
          <div id="input_username" className="sign_up_email">
            <i className="fas fa-envelope signup_icono_email"></i>

            <input
              className="signup_input"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
            />
            <br></br>
            {/*HUNTER KEY*/}
            <span className="signup_email_valido">{isEmail}</span>
            {/* control de errores react-hook-form */}
            <br></br>
            {errors.email && (
              <span className="signup_password_coincide">
                EL EMAIL NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <div id="input_password">
            <i className="fas fa-unlock-alt  signup_icono_password"></i>
            <input
              className="signup_input_password"
              autoComplete="off" //no permitir autocompletado del input
              type="text"
              placeholder="Password"
              {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
            />
            <br></br>
            {errors.password && (
              <span className="signup_password_coincide">
                EL PASSWORD NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <div id="input_password">
            <i className="fas fa-lock signup_icono_password_coincide"></i>
            <input
              className="signup_input"
              autoComplete="off" //no permitir autocompletado del input
              type="text"
              placeholder="   Repita password"
              {...register("passwordR", { required: true })} //crear el name del input y requerido react-hook-form
            />
            <br></br>
            {errors.passwordR && (
              <span className="signup_password_coincide">
                EL PASSWORD NO PUEDE ESTAR VACIO
              </span>
            )}
          </div>
          <div id="input_btn" className="container login_button_body px-0">
            <button className="userhome_home mt-3" type="submit">
              <div className="userhome_iconos">
                <i className="fas fa-edit userhome_icono_default"></i>
                <i className="fas fa-check userhome_icono_hover"></i>
              </div>
              {" "}
              REGISTRARME
            </button>
          </div>
        </form>
      </div>
      {errPass ? (
        <>
          <span className="signup_password_coincide">
            LOS PASSWORDS NO COINCIDEN
          </span>
        </>
      ) : (
        ""
      )}
      <br></br>
      {/* control de errores react-hook-form */}
      {errors.email && (
        <span className="signup_password_coincide">
          EL EMAIL NO PUEDE ESTAR VACIO
        </span>
      )}
      <br></br>
      {errors.password && (
        <span className="signup_password_coincide">
          EL PASSWORD NO PUEDE ESTAR VACIO
        </span>
      )}
    </div>
  );
};
