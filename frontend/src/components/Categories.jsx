import React from 'react';
import { Helmet } from 'react-helmet';

export default function Categories({categoryData}) {
  return (
    <section id="categorias">
        <Helmet>
            <link rel="stylesheet" href="/css/categories.css" />
        </Helmet>
        <h2>Categorias</h2>
        <div>
            {categoryData.map((category) => (
                <CategoryCard img={category.image} text={category.nombre} value={category.valor}/>
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
