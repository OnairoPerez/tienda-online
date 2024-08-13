import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//Componentes
import TopBar from '../components/TopBar';
import SearchProducts from '../components/SearchProducts';

const URL_API = process.env.REACT_APP_API_URL;

function useQuery() {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  return query.get('q')
}

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
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const options = ["Precio ▲️", "Precio ▼", "Más comprado"];
  const query = useQuery();

  useEffect(() => {
    fetch(`${URL_API}/api/products/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        const products = data.documents;
        setProducts(products);

        fetch(`${URL_API}/api/brands`)
          .then(response => response.json())
          .then(data => {
            const brands = data.documents;
            let order = [];
            products.forEach(item => {
              let brand = brands.find(brand => brand._id === item.brand);
              if (brand != null && !order.includes(brand.name)) {
                order.push(brand.name);
              }
            });
            setBrands(order);
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(`${URL_API}/api/brands`)
      .then(response => response.json())
      .then(data => {
        let order = [];
        products.forEach((item) => {
          let brand = data.documents.find(brand => brand._id === item.brand);
          if (brand != null && !order.includes(brand.name)) {
            order.push(brand.name);
          }
        });
        setBrands(order);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // setBrands(orderBrands(products, brands));

  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/search-page.css" />
      </Helmet>
      <TopBar/>
      <section id='Container'>
        <div id='LeftBar'>
          <Order title={"Marca"} items={brands} />
          <Order title={"Ordenar"} items={options} />
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
