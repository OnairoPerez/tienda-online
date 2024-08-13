import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

//Componentes
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const URL_API = process.env.REACT_APP_API_URL;

//Obtener parámetros de la url
function useQuery() {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  return query.get('id')
}

//Formatea un valor numérico para darle una mejor apariencia
function localPrice(price) {
  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
  return formatted.format(price);
}

export default function Products() {
  const [product, setProduct] = useState('');
  let id = useQuery();

  useEffect(() => {
    fetch(`${URL_API}/api/products/get/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error:', error));
  }, []);

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
            <img id='imgProducto' src={product.img} alt={product.name} />
            <div className='flexCenter'>
              <h3>{product.name}</h3>
              <span>Precio: {localPrice(product.price)}</span>
              <p>
                Detalle: <br />
                ¿Necesitas abastecer tu despensa o sorprender a alguien con una selección de productos esenciales?.
                Ofrecemos una variedad de opciones cuidadosamente seleccionadas para satisfacer tus necesidades.
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
