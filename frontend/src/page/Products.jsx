import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

//Componentes
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

//Datos - Se debería obtener del servidor
import products from '../data/products';

//Obtener parámetros de la url
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

//Formatea un valor numérico para darle una mejor apariencia
function localPrice(price) {
  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
  return formatted.format(price);
}

export default function Products() {
  let query = useQuery();
  let product = products.find((item) => item.codigo === query.get('id'));

  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/product-page.css" />
      </Helmet>
      <TopBar></TopBar>
      <main>
        <section className='flexCenter'>
          <h1>Detalles del producto</h1>
          <div id='container' className='flexCenter'>
            <img id='imgProducto' src={product.image} alt={product.nombre} />
            <div className='flexCenter'>
              <h3>{product.nombre}</h3>
              <span>Precio: {localPrice(product.precio)}</span>
              <p>
                Detalle: <br />
                {product.descripcion}
              </p>
              <label htmlFor="inputNum">
                <span id='inputLabel'>Cantidad</span>
                <input type="number" name="" id="inputNum" value="1"></input>
              </label>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </React.StrictMode>
  );
}
