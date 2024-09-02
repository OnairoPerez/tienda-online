import React from 'react'

//Componetes
import TopBar from '../components/TopBar';

//Imágenes
import editar from '../assets/icons/editar.webp';

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
  marginBlock: '20px'
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
  background: '#D9D9D9'
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
  marginTop: '5px'
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
  return (
    <React.StrictMode>
      <TopBar />
      <div style={MAIN}>
        <section style={{ ...CENTER, ...SECTIONS }}>
          <h1>Usuario</h1>
          <div style={{ ...CONTAINER, ...CENTER, flexWrap: 'wrap' }}>
            <div style={{ ...CENTER, ...RIGHT, marginBottom: '20px' }}>
              <img src={editar} alt="Imagen de perfil del usuario" style={USER_IMG} />
              <label htmlFor="inputUser" style={{ ...BUTTON, ...CENTER }}>
                <input id='inputUser' type="file" style={{ display: 'none' }} />
                <span>Seleccionar</span>
              </label>
            </div>
            <div style={{ ...LEFT, ...CENTER }}>
              <label htmlFor="userName" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Nombre</span>
                <input id='userName' type="text" style={INPUT_TEXT} />
              </label>
              <label htmlFor="userID" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Cedula</span>
                <input id='userID' type="text" style={INPUT_TEXT} />
              </label>
              <label htmlFor="userTel" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Teléfono</span>
                <input id='userTel' type="text" style={INPUT_TEXT} />
              </label>
              <label htmlFor="userAddress" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Dirección</span>
                <input id='userAddress' type="text" style={INPUT_TEXT} />
              </label>
              <label htmlFor="userCity" style={LABEL_TEXT}>
                <span style={SPAN_TEXT}>Cuidad</span>
                <input id='userCity' type="text" style={INPUT_TEXT} />
              </label>
            </div>
          </div>
        </section>
        <section style={{ ...CENTER, ...SECTIONS }}>
          <h1>Autentificación</h1>
          <div>
            <h3>Cambiar contraseña</h3>
            <label htmlFor="oldPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Contraseña actual</span>
              <input id='oldPassword' type="password" style={INPUT_TEXT} />
            </label>
            <label htmlFor="newPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Nueva contraseña</span>
              <input id='newPassword' type="password" style={INPUT_TEXT} />
            </label>
            <label htmlFor="confirmPassword" style={LABEL_TEXT}>
              <span style={SPAN_TEXT}>Confirmación</span>
              <input id='comfirmPassword' type="password" style={INPUT_TEXT} />
            </label>
          </div>
        </section>
      </div>
      <div style={{...CENTER, margin: '20px'}}>
        <button style={BUTTON}>Actualizar</button>
      </div>
    </React.StrictMode>
  )
}

export default User