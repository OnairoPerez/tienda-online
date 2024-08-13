import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const URL_API = process.env.REACT_APP_API_URL;

export default function HomeProducts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${URL_API}/api/products/most-purchased`)
      .then(response => response.json())
      .then(data => setData(data.documents))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section id="productos">
      <Helmet>
        <link rel="stylesheet" href="/css/products.css" />
      </Helmet>
      <div>
        <h2>Productos</h2>
        <p style={{textAlign: 'center'}}>
          No te puedes perder nuestra <br/> selección de los productos más <br/> 
          comprados por nuestros clientes, <br/> que incluye desde alimentos <br/>
          y bebidas hasta artículos de <br/> limpieza e higiene. Todos ellos <br/>
          de la mejor calidad y con la <br/> garantía de nuestra tienda
        </p>
      </div>
      <div>
        {data.map((product) => (
          <ProductsCard img={product.img} name={product.name} id={product.web_id}/>
        ))}
      </div>
    </section>
  );
}

function ProductsCard({img, name, id}) {
  return (
    <article>
      <img loading='lazy' src={img} alt={name} />
      <p>{name}</p>
      <button onClick={() => {window.location.href = `/producto?id=${id}`}}>Detalles</button>
    </article>
  );
}
