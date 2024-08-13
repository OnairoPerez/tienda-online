import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const URL_API = process.env.REACT_APP_API_URL;

export default function Categories() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${URL_API}/api/categories`)
      .then(response => response.json())
      .then(data => setData(data.documents))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section id="categorias">
        <Helmet>
            <link rel="stylesheet" href="/css/categories.css" />
        </Helmet>
        <h2>Categorias</h2>
        <div>
            {data.map((category) => (
                <CategoryCard img={category.img} text={category.name} value={category.value}/>
            ))}
        </div>
    </section>
  )
}

//Targeta que representa una categoria
function CategoryCard({img, text, value}) {
    return (
        <a href={"/search?c=" + value} className='ctg'>
            <div style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%), url(/category/${img})`}}></div>
            <p>{text}</p>
        </a>
    );
}
