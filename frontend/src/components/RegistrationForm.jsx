import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const URL_API = process.env.REACT_APP_API_URL;

export default function RegistrationForm() {
  const [names, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmation) {
      const data = {
        credentials: {
          email: email,
          password: password
        },
        user: {
          name: names,
          surname: surname,
          cc: id,
          address: address,
          tel: phone,
          city: city
        }
      }

      fetch(`${URL_API}/api/account/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            window.location.href = "/login"
          } else {
            alert("Se ha encotrado errores en la información suministrada")
          }
        })
        .catch(() => {
          alert("Ha ocurrido un error de registro o el usuario ya existe")
        });
    } else {
      alert('La contraseña de confirmación no es correcta');
    }
  }

  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/registration-form.css" />
      </Helmet>
      <form id="formulario" onSubmit={handleSubmit}>
        <h2>Registrar</h2>
        <fieldset className="sectionform info">
          <legend>Datos personales</legend>
          <input type="text" value={names} onChange={(e) => setName(e.target.value)} name="name" form="formulario" autocomplete="off" placeholder="Nombres" required />
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} name="surname" form="formulario" autocomplete="off" placeholder="Apellidos" required />
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} name="personID" form="formulario" autocomplete="off" placeholder="Número de identificación" required />
        </fieldset>
        <fieldset id="fieldset2" className="sectionform info">
          <legend>Datos de contacto</legend>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address" autocomplete="off" placeholder="Dirección de recidencia" required />
          <div>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" form="formulario" autocomplete="off" placeholder="Celular" required />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" form="formulario" autocomplete="off" placeholder="Ciudad" required />
          </div>
        </fieldset>
        <fieldset class="sectionform account" >
          <legend>Crear cuenta</legend>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" form="formulario" autocomplete="off" placeholder="Correo Elctrónico" style={{marginBottom: '15px'}} />
          <div id="password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" form="formulario" autocomplete="off" placeholder="Contraseña" required />
            <button id="eye" type="button">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
            </button>
          </div>
          <input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} autocomplete="off" placeholder="Confirmar contraseña" required/>
          <div id='regButton'>
            <button class="account" type="submit">Registrarce</button>
          </div>
        </fieldset>
      </form>
    </React.StrictMode>
  );
}
