import { Fragment, useEffect, useState } from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {
    // Citas en el local Storage

    let citasLocales = JSON.parse(localStorage.getItem('citas'));
    if (!citasLocales) {
        citasLocales = [];
    }
    // state para almacenar las citas
    const [citas, guardarCitas] = useState(citasLocales);

    // Use effect para realizar ciertas operaciones cuando el state cambia
    useEffect(() => {
        if (citasLocales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas, citasLocales]);

    // Funcion para crear una cita
    const crearCita = (cita) => {
        guardarCitas([...citas, cita]);
    };

    // Funcion para eliminar una cita
    const eliminarCita = (id) => {
        const nuevasCitas = citas.filter((cita) => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    // Mensaje Condicional
    const titulo = citas.length > 0 ? 'Administra tus citas' : 'No hay citas';

    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>

            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita} />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map((cita) => (
                            <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
