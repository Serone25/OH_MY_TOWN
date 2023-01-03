import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form"; // permite el manejo de formularios https://www.npmjs.com/package/react-hook-form

import "../../styles/login.css";
export const FormSignup = () => {

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // declaracion para react-hook-form
  const { actions } = useContext(Context);
  
  const [errPass, setErrPass] = useState(false);
  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data)
    const url = "/api/new_user";
    const method = "POST";
    const head = { "Content-Type": "application/json" };
    if (data.password !== data.passwordR) {
		setErrPass(true)
    } else {
      const login = actions.solicitudesAPI(url, method, head, data);
      if (login) {
        window.location.href="/login"
      }
    }
  };

  return (
    <div className="login-body">
      <section className="d-flex justify-content-center">
        <h5>Registro</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex container-fluid flex-column mt-5">
            <div
              id="input_username"
              className="row mt-2 align-items-center bg-warning rounded"
            >
              <span className="col-3 ">Email</span>
              <input
                type="text"
                className="form-control ms-2 col"
                placeholder="Email"
                {...register("email", { required: true })} //crear el name del input y requerido react-hook-form
              />
            </div>
            <div
              id="input_password"
              className="row mt-2 align-items-center bg-warning rounded"
            >
              <span className="col-3 ">Password</span>

              <input
                autoComplete="off" //no permitir autocompletado del input
                type="text"
                className="form-control  ms-2 col"
                placeholder="Password"
                {...register("password", { required: true })} //crear el name del input y requerido react-hook-form
              />
            </div>
            <div
              id="input_password"
              className="row mt-2 align-items-center bg-warning rounded"
            >
              <span className="col-3 ">Repita password</span>

              <input
                autoComplete="off" //no permitir autocompletado del input
                type="text"
                className="form-control  ms-2 col"
                placeholder="Repita password"
                {...register("passwordR", { required: true })} //crear el name del input y requerido react-hook-form
              />
            </div>
            <div id="input_btn" className="row my-4">
              <div className="d-inline-flex container justify-content-center">
                <button className="btn btn-primary m-0" type="submit">
                  {" "}
                  enviar
                </button>
              </div>
            </div>
          </div>
		  {errPass? (
          <>
            <span className="text-danger text-small d-block m-2 fw-lighter">
              El password no coincide
            </span>
          </>
        ) : (
          ""
        )}

          {/* control de errores react-hook-form */}
          {errors.email && (
            <span className="text-danger text-small d-block m-2 fw-lighter">
              El campo email no puede estar vacío
            </span>
          )}
          {errors.password && (
            <span className="text-danger text-small d-block m-2 fw-lighter">
              El campo password no puede estar vacío
            </span>
          )}
        </form>
      </section>
    </div>
  );
};
