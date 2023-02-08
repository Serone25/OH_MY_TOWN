import React, {useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/help.css";
import fondo from "../../img/fondo.jpg"
import hoguera from "../../img/grupohoguera.jpg"
import duda from "../../img/duda.jpg"

export const Help = () => {
	const { actions } = useContext(Context);
	const token = localStorage.getItem("jwt-token");
	useEffect(() => {
		if (token) {
		  actions.logIn();
		}
		
	  }, []);
	return (
		<div className= "help_body" style={{backgroundColor:"#fdefbc"}}>
			<div className= "container">
				<h1 className="rotulo_principal">NOS ENCANTAN LAS</h1>
				<h1 className="rotulo_principal mb-5"><span className="experiencias">NUEVAS EXPERIENCIAS...</span></h1>
				<img className="fotoHoguera" src={hoguera}/>
				<h2 className="rotulo_secundario my-5">...PERO SIEMPRE SURGEN <span className="dudas">DUDAS</span></h2>
				<img className="rounded mx-auto d-block" src={duda}/>
				<h2 className="usuario_cabecera my-5"> SI ERES <span className="usuario">USUARIO</span></h2>
				<div className="texto_usuario">
					<p>Bueno, lo primero es decidir a dónde quieres viajar. Una vez ahí, te invitamos a que uses el buscador para encontrar actividades en la ciudad a la que viajas y escojas la que te apetezca y cumpla con los requisitos de fecha y hora que estimes. Además, muchas de nuestras
						propuestas ya han sido realizdas por otros usuarios por lo que te puede servir las experiencias que han tenido previamente para saber lo que te vas a encontrar.
					</p>
					<p></p>
					<h4 className="preguntas">Preguntas frecuentes</h4>
					<p className="pregunta">¿Si hago una reserva para otra persona, debo hacerla a mi nombre o al suyo?</p>
					<p>Aunque utilices tu correo, tu cuenta Civitatis, o incluso tu tarjeta bancaria para hacer la reserva, debes indicar los datos de la persona que va a disfrutar el servicio turístico.</p>
					<p className="pregunta">¿Con cuánta antelación debo realizar mi reserva?</p>
					<p>Nuestra recomendación es que realices tu reserva tan pronto como sepas la fecha en que quieres disfrutarla para evitar la falta de disponibilidad. Debes tener en cuenta que, tanto en los traslados como en las actividades existe un tiempo mínimo de antelación para poder procesar la reserva. Puedes observar cuál es este tiempo en la ficha de las actividades.</p>
					<p className="pregunta">¿Qué sucede si llueve o hace mal tiempo?</p>
					<p>Todas las actividades se realizan con normalidad a lo largo de todo el año independientemente de la lluvia o el mal tiempo. Si por condiciones climáticas extremas (por ejemplo, una fuerte nevada), el operador local tuviera que cancelar un tour porque entraña un riesgo para el desarrollo del servicio y sus participantes, se te ofrecería una fecha alternativa o el reintegro inmediato del pago.</p>
					<p className="pregunta">No sé si me dará tiempo a llegar al tour ¿Si llego tarde me esperarán?</p>
					<p>Los tours regulares salen siempre puntuales y no es posible modificar la hora de inicio. Respecto a los tours privados, si quieres empezar a otra hora podéis consultarnos antes de hacer la reserva a través de nuestro formulario de contacto.
						En caso de que vayas a llegar tarde, tanto en un tour privado como en un tour regular, puedes contactar con tu guía.</p>
					<p className="pregunta">¿Cuáles son las horas disponibles de una actividad?</p>
					<p>Todas las actividades tienen al menos una hora disponible. Si se ofrecen diferentes horas de inicio, podrás ver las que quedan disponibles cuando selecciones una fecha marcada en gris oscuro.</p>
					<p className="pregunta">¿Puedo pagar todo en destino?</p>
					<p>En la actualidad es necesario abonar el importe total o elegir el pago a plazos (solo disponible para algunos países) en el momento de hacer la reserva para que quede confirmada.

Se puede pagar con tarjeta de crédito, tarjeta de débito, Google Pay o PayPal entre otros.</p>

				</div>
				<h2 className="usuario_cabecera my-5"> SI ERES <span className="usuario">GUIA</span></h2>
				<div className="texto_usuario pb-5">
					<p>Lo primero y más importante es que deberías de estar lo más familiarizado posible con la actividad que propones para que el usuario tenga una buena experiencia. Además, planificar todo de antemano te puede ayudar en caso de que ocurra algo antes o durante la actividad.</p>
					<p>La descripción de las actividades, sin ser obligatorio, debería de poder contestar, mediante la foto o la descripción, a preguntas tales como:<br></br>
						<p className="preguntas_guia">¿Qué debo llevar para la actividad?</p>
						<p className="preguntas_guia">¿Cuánto tiempo dura la actividad?</p>
						<p className="preguntas_guia">¿Es apta para todas las edades?</p>
						<p className="preguntas_guia">¿Es necesario tener experiencia previa?</p>
						<p className="preguntas_guia">¿Hay un límite en el número de participantes?</p>
					<p>Ponte en contacto con la gente que haya reservado uno o dos días antes para poder informarles de dónde se va a celebrar, así como un teléfono de contacto que les puedas facilitar para poder tener comunicación.</p>
					<p>Ante cualquier adversidad, ponte en contacto con el cliente y nuestro soporte para poder efectuar el reembolso si fuera necesario y no causar una mala impresión de cara a posibles futuras actividades.</p>
					</p>
				</div>
			</div>
		</div>
	);
};