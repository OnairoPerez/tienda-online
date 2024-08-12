import React from 'react';
import { Helmet } from 'react-helmet';

//Componentes
import TopBar from '../components/TopBar';
import SearchProducts from '../components/SearchProducts';

//Datos
import products from '../data/products.js';
import brands from '../data/brands.js';

let data = {"brands": [], "options": []};
//Obtener las marcas de los productos y evitar repeticiones
products.forEach((item) => {
  let brand = brands.find(brand => brand.id === item.id_marca);
  if (brand != null && !data.brands.includes(brand.nombre)) {
    data.brands.push(brand.nombre);
  }
})
//Agregar opciones
data.options.push("Precio ▲️", "Precio ▼", "Más comprado");

//Genera la sección ordenar
function Order({title, items}) {
    return (
      <div id={title} className='Options'>
        <h4>{title}</h4>
        <hr />
        {items.map((item) => (
          <button>{item}</button>
        ))}
      </div>
    );
}

export default function Search() {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/search-page.css" />
      </Helmet>
      <TopBar/>
      <section id='Container'>
        <div id='LeftBar'>
          <Order title={"Marca"} items={data.brands} />
          <Order title={"Ordenar"} items={data.options} />
          <div className='space'></div>
        </div>
        <div id='Contenido'>
          <SearchProducts data={products}></SearchProducts>
          <div id='indice'>
            <button className="buttonInd">◀</button>
            <button className="buttonInd">1</button>
            <button className="buttonInd">▶</button>
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
}
