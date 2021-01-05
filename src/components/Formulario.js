import { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
    const [cita, actualizarCitas] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    // state para manejo de validacion
    const [error, actualizarError] = useState(false);

    // Función que se ejecuta cada que el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCitas({
            ...cita,
            [e.target.name]: e.target.value,
        });
    };

    // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Enviar Datos
    const submitCita = (e) => {
        e.preventDefault();

        // validar
        if (
            mascota.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''
        ) {
            actualizarError(true);
            return;
        }
        // Eliminar el mesnaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCitas({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        });
    };

    return (
        <Fragment>
            <h2>Crear Citas</h2>

            {error ? (
                <p className="alerta-error">Todos Los campos son obligatorios</p>
            ) : null}
            <form onSubmit={submitCita}>
                <label>Nombre Mascota:</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño:</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora:</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas:</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Breve descripción..."
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button type="submit" className="u-full-width button-primary">
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
};

export default Formulario;
