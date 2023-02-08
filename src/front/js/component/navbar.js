import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import { BiLogInCircle } from "react-icons/bi";
import {BiLogOutCircle} from "react-icons/bi"
import {BiArea} from "react-icons/bi"

import { TfiHelp } from "react-icons/tfi";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import "../../styles/navbar.css";
import logo from "../../img/OMT1.png";
import logo2 from "../../img/logo2.png"
import { IconContext } from "react-icons";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");
  const [esLogin, setEsLogin] = useState(false);
  //if (userid){setEsLogin(true)}
  /* Navbar Animation*/
  const [show, setShow] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 80) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      
    };
    
  }, []);

  return (
    <div className={`header_area ${show && "stickyheader"}`} id="header">
      <header className="default-header">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg">
              <div className="col-1"></div>
              <div className="col-5">
                <Link to="/">
                  <span className="home nav-link">
                    <img className="img-fluid logo" src={logo2} />
                  </span>
                </Link>
              </div>
                <div className="changeColor col-1">
                  <Link to="/search">
                    <span className="search nav-link">
                      {/*<BsSearch size="30px" className="changeColor" />*/}
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="3" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                      </svg> 
                    </span>
                  </Link>
                </div>
                {(!store.userid ) ? (
                  
                    <div className="changeColor col-1">
                      <Link to="/login" >
                        <span className="login nav-link">
                          {/*<BiLogInCircle size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />*/}
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login" onClick={() => setEsLogin(!esLogin)} width="44" height="44" viewBox="0 0 24 24" stroke-width="3" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  
                ) : (
                  <>
                    <div className="changeColor col-1">
                      <Link to="/logout" >
                        <span className="login nav-link">
                          {/*<BiLogOutCircle size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />*/}
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" onClick={() => setEsLogin(!esLogin)} width="44" height="44" viewBox="0 0 24 24" stroke-width="3" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                    <div className="changeColor col-1">
                      <Link to="/userhome" >
                        <span className="login nav-link">
                          {/*<BiArea size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />*/}
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="3" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                 
                  </>
              )}

              <div className="changeColor col-1">
                <Link to="/help">
                  <span className="help nav-link">
                    {/*<TfiHelp size="30px" className="changeColor" />*/}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="44" height="44" viewBox="0 0 24 24" stroke-width="3" stroke="#ff4500" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="17" x2="12" y2="17.01" />
                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                    </svg>
                  </span>
                </Link>
              </div>
              <div className="col-2"></div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
