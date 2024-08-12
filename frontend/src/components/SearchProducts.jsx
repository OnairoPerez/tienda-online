import React from 'react';
import { Helmet } from 'react-helmet';

//Genera un elemento individual para un producto
function ProductCard({img, code, name, price}) {
  return (
      <a href={"/producto?id=" + code} className='ProdList'>
        <div>
          <img src={img} alt={name} />
        </div>
        <div className='TextList'>
          <p>{name}</p>
          <p id='price'>{localPrice(price)}</p>
        </div>
      </a>
  );
}

//Formatea un valor numérico para darle una mejor apariencia
function localPrice(price) {
  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
  return formatted.format(price);
}

export default function SearchProducts({data}) {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/search-products.css" />
      </Helmet>
      <div id="Productos">
        {data.map((product) => (
          <ProductCard img={product.image} code={product.codigo} name={product.nombre} price={product.precio}></ProductCard>
        ))}
      </div>
    </React.StrictMode>
  )
}
