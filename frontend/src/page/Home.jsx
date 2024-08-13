import React from 'react'
import { Helmet } from 'react-helmet';

//Componentes
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import HomeProducts from '../components/HomeProducts';

//Imágenes
import banner from '../assets/image/banner.webp';
import moneda from '../assets/image/moneda.webp';

//Datos - Esta infomación se debería obtener de la API
const category = require('../data/category.js');
let product = require('../data/products.js');

//Ordenar productos
product = orderProducts(product);

export default function Home() {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="preload" href="/css/home-page.css" as="style" />
        <link rel="stylesheet" href="/css/home-page.css" />
      </Helmet>
      <main>
        <TopBar/>
        <section id="slogan">
          <div>
            <h1>Canasta Hogareña</h1>
            <p>Descubre los mejores productos para tu hogar al mejor precio, con la calidad, variedad y servicio que solo nosotros te podemos ofrecer.</p>
          </div>
          <img loading='lazy' src={banner} alt="Estanterías enfoque central" />
        </section>
        <Categories/>
        <HomeProducts dataProducts={product}/>
        <section id="cta">
          <img loading='lazy' src={moneda} alt="Icono de moneda" />
          <div>
            <h2>Puntos fidelidad</h2>
            <p>
              Aprovecha nuestro sistema de puntos y canjea los 
              mejores productos por tu fidelidad. Regístrate 
              y empieza a acumular puntos con cada compra que 
              hagas.
            </p>
          </div>
        </section>
      </main>
      <Footer/>
    </React.StrictMode>
  );
}

//Obtener los primeros cuatro productos más comprados
function orderProducts(data) {
  data.sort((a, b) => b.comprados - a.comprados);
  return data.slice(0, 4);
}
