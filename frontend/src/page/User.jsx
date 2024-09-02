import React, { useState } from 'react'

//Componetes
import TopBar from '../components/TopBar';

//Imágenes
import editar from '../assets/icons/editar.webp';

//Variables de entorno
const URL_API = process.env.REACT_APP_API_URL;

//Datos (Se deben obtener de la base de datos a travez de la api)
const user = {
  _id: 'f133fb5a65494444a3b70b8d1672f5b7',
  photo: 'https://img.freepik.com/foto-gratis/cierre-dientes-hombre-moreno-sonriendo_1187-5800.jpg',
  name: 'Luis',
  surname: 'Martínez',
  cc: '890123456',
  address: 'Calle 5, Apt 3A',
  city: 'Pereira',
  tel: '3206789012'
}

//Estilos
const CENTER = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const CONTAINER = {
  flexDirection: 'row',
  marginTop: '20px'
}
const SECTIONS = {
  flexDirection: 'column',
  color: 'white',
  marginBlock: '20px',
}
const MAIN = { 
  display:'flex', 
  flexWrap: 'wrap', 
  justifyContent:'space-evenly', 
  alignItems:'start'
}
const RIGHT = {
  flexDirection: 'column'
}
const LEFT = {
  flexDirection: 'column',
  marginInline: '10px'
}
const USER_IMG = {
  width: '250px',
  height: '250px',
  borderRadius: '20px',
  background: '#D9D9D9',
  objectFit: 'cover'
}
const BUTTON = {
  width: '120px',
  height: '40px',
  background: '#695D5D',
  borderRadius: '10px',
  color: 'white',
  borderColor: 'transparent',
  fontSize: '20px',
  fontFamily: 'Roboto',
  fontWeight: '700',
  marginTop: '10px'
}
const LABEL_TEXT = {
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column'
}
const INPUT_TEXT = {
  height: '30px',
  borderRadius: '10px',
  width: '300px',
  borderColor: 'transparent',
  background: '#D9D9D9',
  textAlign: 'center',
  fontSize: 'medium'
}
const SPAN_TEXT = {
  color: 'white',
  fontSize: '20px',
  marginTop: '5px'
}

function User() {
  const [names, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [id, setId] = useState(user.cc);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.tel);
  const [city, setCity] = useState(user.city);

  //Constraseñas
  const [oldPW, setOldPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');

  //Actualizar contraseña
  const updateData = () => {
    const data = {
      name: names,
      surname: surname,
      cc: id,
      address: address,
      tel: phone,
      city: city
    }

    fetch(`${URL_API}/api`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert('Información guardada')
        } else {
          alert('Se ha encotrado errores en la información suministrada');
        }
      })
      .catch(() => {
        alert('Ha ocurrido un error');
      });
  }

  const updatePassword = () => {
    if (newPW === confirmPW) {
      const data = {
        old: oldPW,
        new: newPW
      }

      fetch(`${URL_API}/api`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            alert('Contraseña actualizada')
          } else {
            alert('La información suministrada en incorrecta');
          }
        })
        .catch(() => {
          alert('Ha ocurrido un error');
        });
    } else {
      alert('La contraseña de confirmación no es correcta')
    }
  }

  return (
    <React.StrictMode>
      <TopBar />
      <div style={MAIN}>
        <section style={{ ...CENTER, ...SECTIONS }}>
          <h1>Usuario</h1>
          <div style={{ ...CONTAINER, ...CENTER, flexWrap: 'wrap' }}>
            <div style={{ ...CENTER, ...RIGHT, marginBottom: '20px' }}>
              <img src={user.photo || editar} alt="Imagen de perfil del usuario" style={USER_IMG} />
              <label htmlFor="inputUser" style={{ ...BUTTON, ...CENTER }}>
                <input id='inputUser' type="file" style={{ display: 'none' }} />
                <span>Seleccionar</span>
              </label>
            </div>
            <div style={{ ...LEFT, ...CENTER }}>
              <label htmlFor="userName" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Nombre</span>
                <input value={names} id='userName' type="text" style={INPUT_TEXT} onChange={(e) => {setName(e.target.value)}}/>
              </label>
              <label htmlFor="userSurname" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Apellido</span>
                <input value={surname} id='userSurname' type="text" style={INPUT_TEXT} onChange={(e) => {setSurname(e.target.value)}} />
              </label>
              <label htmlFor="userID" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Cedula</span>
                <input value={id} id='userID' type="text" style={INPUT_TEXT} onChange={(e) => {setId(e.target.value)}} />
              </label>
              <label htmlFor="userTel" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Teléfono</span>
                <input value={phone} id='userTel' type="text" style={INPUT_TEXT} onChange={(e) => {setPhone(e.target.value)}} />
              </label>
              <label htmlFor="userAddress" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Dirección</span>
                <input value={address} id='userAddress' type="text" style={INPUT_TEXT} onChange={(e) => {setAddress(e.target.value)}} />
              </label>
              <label htmlFor="userCity" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Cuidad</span>
                <input value={city} id='userCity' type="text" style={INPUT_TEXT} onChange={(e) => {setCity(e.target.value)}} />
              </label>
              <button onClick={updateData} style={BUTTON}>Guardar</button>
            </div>
          </div>
        </section>
        <section style={{ ...CENTER, ...SECTIONS }}>
          <h1>Autentificación</h1>
          <div>
            <h3>Cambiar contraseña</h3>
            <label htmlFor="oldPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Contraseña actual</span>
              <input value={oldPW} id='oldPassword' type="password" style={INPUT_TEXT} onChange={(e) => {setOldPW(e.target.value)}} />
            </label>
            <label htmlFor="newPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Nueva contraseña</span>
              <input value={newPW} id='newPassword' type="password" style={INPUT_TEXT} onChange={(e) => {setNewPW(e.target.value)}} />
            </label>
            <label htmlFor="confirmPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Confirmación</span>
              <input value={confirmPW} id='comfirmPassword' type="password" style={INPUT_TEXT} onChange={(e) => {setConfirmPW(e.target.value)}} />
            </label>
          </div>
          <button onClick={updatePassword} style={BUTTON}>Actualizar</button>
        </section>
      </div>
      <div style={{...CENTER, margin: '20px'}}>
        
      </div>
    </React.StrictMode>
  )
}

export default User