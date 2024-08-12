import React from 'react';
import { Helmet } from 'react-helmet';

//Imágenes
import user from '../assets/image/user.webp';

//Estilos css
//import '../css/login-form.css'

export default function LoginForm() {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/login-form.css" />
      </Helmet>
      <img className='rightImg' src={user} alt="Icono usuario" />
      <form id='container'>
        <input name="email" type="email" placeholder="Correo Electrónico" required />
        <input name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
        <a href="">Olvidé mi contraseña</a>
        <a href="./registro">Registrarce</a>
      </form>
    </React.StrictMode>
  );
}
