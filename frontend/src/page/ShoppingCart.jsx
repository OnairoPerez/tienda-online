import React from 'react';
import { Helmet } from 'react-helmet';

//Componentes
import TopBar from '../components/TopBar';

//Datos - Se debería obtener del servidor
let data = [
  {
    'nombre': 'Arroz Diana Blanco Vitamor x 1 Kilogramo',
    'precio': 4800,
    'cantidad': 4
  },
  {
    'nombre': 'Arroz Diana Blanco Vitamor x 25 Libras',
    'precio': 59000,
    'cantidad': 1
  }
];

//Formatea un valor numérico para darle una mejor apariencia
function localPrice(price) {
  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
  return formatted.format(price);
}

//Procesar la información de data y crear dos componentes
let rightItems = [];
let leftItems = [];
let total = 0;
data.forEach((item) => {
  let pago = item.precio * item.cantidad;
  total += pago;

  rightItems.push(
    <div className='item-list'>
      <span>{item.nombre}</span>
      <span>{item.precio}</span>
      <span>{item.cantidad}</span>
    </div>
  );
  leftItems.push(
    <div className='val-cant'>
      <span>{localPrice(pago)}</span>
    </div>
  );
})

export default function ShoppingCart() {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/cart-page.css" />
      </Helmet>
      <main>
        <TopBar/>
        <div id="container" className="flexCenter">
          <div id="table-left" className="flexCenter tables" >
            <h2>Productos</h2>
            <div id="table-productos" className="table" >
              <div className="headers item-list">
                <h4>Nombre</h4>
                <h4>Precio/u </h4>
                <h4>Cantidad</h4>
              </div>
              {rightItems}
            </div>
            <button id="agregar">Realizar pedido</button>
          </div>
          <div id="table-right" className="flexCenter tables" >
            <h2>Total</h2>
            <div id="table-total" className="table">
              <div className="headers"></div>
              {leftItems}
            </div>
            <div className="flexCenter val-total">
              <span id="valorTotal">{localPrice(total)}</span>
              <span>Total</span>
            </div>
          </div>
        </div>
      </main>
    </React.StrictMode>
  );
}
