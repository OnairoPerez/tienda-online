import React from 'react';
import { Helmet } from 'react-helmet';

export default function RegistrationForm() {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/registration-form.css" />
      </Helmet>
      <form id="formulario">
        <h2>Registrar</h2>
        <fieldset className="sectionform info">
          <legend>Datos personales</legend>
          <input type="text" name="name" form="formulario" autocomplete="off" placeholder="Nombres" required />
          <input type="text" name="surname" form="formulario" autocomplete="off" placeholder="Apellidos" required />
          <input type="number" name="personID" form="formulario" autocomplete="off" placeholder="Número de identificación" required />
        </fieldset>
        <fieldset id="fieldset2" className="sectionform info">
          <legend>Datos de contacto</legend>
          <input type="text" name="address" autocomplete="off" placeholder="Dirección de recidencia" required />
          <div>
            <input type="tel" name="phone" form="formulario" autocomplete="off" placeholder="Celular" required />
            <input type="text" name="city" form="formulario" autocomplete="off" placeholder="Ciudad" required />
          </div>
        </fieldset>
        <fieldset class="sectionform account" >
          <legend>Crear cuenta</legend>
          <input type="email" name="email" form="formulario" autocomplete="off" placeholder="Correo Elctrónico" style={{marginBottom: '15px'}} />
          <div id="password">
            <input type="password" name="password" form="formulario" autocomplete="off" placeholder="Contraseña" required />
            <button id="eye" type="button">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
            </button>
          </div>
          <input type="password" autocomplete="off" placeholder="Confirmar contraseña" required/>
          <div id='regButton'>
            <button class="account" type="submit">Registrarce</button>
          </div>
        </fieldset>
      </form>
    </React.StrictMode>
  );
}
