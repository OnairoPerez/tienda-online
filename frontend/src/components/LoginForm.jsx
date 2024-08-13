import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

//Imágenes
import user from '../assets/image/user.webp';

const URL_API = process.env.REACT_APP_API_URL;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    fetch(`${URL_API}/api/account/auth`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if(response.ok) {
          window.location.href = '/';
        } else {
          alert('Credenciales incorrectas');
        }
      });
  }

  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/login-form.css" />
      </Helmet>
      <img className='rightImg' src={user} alt="Icono usuario" />
      <form id='container' onSubmit={handleSubmit}>
        <input name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Correo Electrónico" required />
        <input name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
        <a href="">Olvidé mi contraseña</a>
        <a href="./registro">Registrarce</a>
      </form>
    </React.StrictMode>
  );
}
