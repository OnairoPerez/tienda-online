import React from 'react';
import { Helmet } from 'react-helmet';

//Imágenes
import logo from '../assets/image/logo.webp';

//Estilos css
//import '../css/base-template.css';

export default function BaseTemplate({ children }) {
  return (
    <React.StrictMode>
      <Helmet>
        <link rel="stylesheet" href="/css/base-template.css" />
      </Helmet>
      <section id="left" className="section">
        <img src={logo} alt="Logo Canasta Hogareña" />
        <p>Canasta Hogareña, "Calidad y economía a su alcance"</p>
      </section>
      <section id="right" className="section">
        {children}
      </section>
      <script>document.body.classList.add('template');</script>
    </React.StrictMode>
  );
}
