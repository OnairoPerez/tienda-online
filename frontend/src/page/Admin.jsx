import React, { useState } from 'react'

//Imágenes
import logo from '../assets/image/logo.webp';
import user from '../assets/icons/user.webp';

//datos de pruebas
const products = [
  {
    web_id: 'WmUnWooIlk',
    name: 'Arroz diana'
  },
  {
    web_id: 'nOndyHz4Dc',
    name: 'Arroz roa'
  }
]

//Estilos css
const NAV = {
  background: '#B20505',
  width: '100%',
  height: '70px',
  display: 'grid',
  gridTemplateAreas: "'right center left'"
}
const MAIN = {
  height: 'calc(100vh - 90px)',
  width: '100%',
  marginTop: '20px',
  display: 'grid',
  gridTemplateAreas: `
    'menuBar itemList' 
    'view itemList'
  `,
  gridTemplateColumns: '1fr 40%',
  gridTemplateRows: '50px 1fr'
}
const IMG = {
  borderRadius: '50%'
}
const IMG_LOGO = {
  width: '90px'
}
const RIGHT = {
  display: 'grid',
  gridArea: 'right',
  justifyContent: 'start'
}
const CENTER = {
  display: 'grid',
  gridArea: 'center',
  justifyContent: 'center',
  color: 'white'
}
const LEFT = {
  display: 'grid',
  gridArea: 'left',
  justifyContent: 'end'
}
const IMG_USER = {
  width: '40px',
  margin: '10px'
}
const MENU_BAR = {
  gridArea: 'menuBar',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end'
}
const BUTTONS = {
  height: '40px',
  width: '120px',
  borderColor: 'transparent',
  borderRadius: '10px',
  background: '#332f2f',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  marginInline: '5px',
  minWidth: 'min-content'
}
const ITEM_LIST = {
  gridArea: 'itemList',
  display: 'flex',
  justifyContent: 'center'
}
const LIST_CONTAINER = {
  width: '90%',
  height: '90%',
  margin: '10px',
  borderRadius: '20px',
  background: '#332f2f',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px'
}

function Item({name, id}) {
  const DIV = {
    width:'100%', 
    background: '#695D5D', 
    display:'flex', 
    flexDirection: 'row'
  }

  const handleClick = () => {
    //Eliminar producto
    alert("Producto: " + id);
  }

  return (
    <div style={DIV}>
      <span>{name}</span>
      <button onClick={handleClick}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </div>
  );
}

function ProductsAdmin() {
  const [textView, setTextView] = useState('Más populares - Stock');

  return (
    <React.StrictMode>
      <nav style={NAV}>
        <div id="right" style={RIGHT}>
          <img id="logo" src={logo} alt="Logo de la empresa" style={{ ...IMG, ...IMG_LOGO }} />
        </div>
        <div id="center" style={CENTER}>
          <h1>Administración de productos</h1>
        </div>
        <div id="left" style={LEFT}>
          <img onClick={() => {window.location.href = '/usuario'}} src={user} alt="Icono de usuario" style={{ ...IMG, ...IMG_USER }} />
        </div>
      </nav>
      <section style={MAIN}>
        <div style={MENU_BAR}>
          <div>
            <button style={BUTTONS}>Productos</button>
            <button style={BUTTONS}>Categorias</button>
            <button style={BUTTONS}>Usuarios</button>
          </div>
        </div>
        <div style={ITEM_LIST}>
          <div style={LIST_CONTAINER}>
            <div className='search' style={{ display: 'grid', gridTemplateColumns: '1fr 38px', gridTemplateRows: '1fr', margin: '10px' }}>
              <input type="text" placeholder='Buscar' style={{ borderRadius: '10px', marginInline: '10px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} />
              <button style={{ borderRadius: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
            <div className='list'>
              <h3>{textView}</h3>
              <hr />
              {products.map(product => (
                <Item name={product.name} id={product.web_id} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ gridArea: 'view' }}>

        </div>
      </section>
    </React.StrictMode>
  )
}

export default ProductsAdmin