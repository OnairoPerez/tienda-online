import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Componentes
import Home from '../page/Home';
import BaseTemplate from '../page/BaseTemplate';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Search from '../page/Search';
import ShoppingCart from '../page/ShoppingCart';
import Products from '../page/Products';

export default function router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<BaseTemplate><LoginForm/></BaseTemplate>}/>
        <Route path='/registro' element={<BaseTemplate><RegistrationForm/></BaseTemplate>}/>
        <Route path='/buscador' element={<Search/>}/>
        <Route path='/carrito' element={<ShoppingCart/>}/>
        <Route path='/producto' element={<Products/>}></Route>
        <Route path='*' element={<p><strong>Error 404</strong> Página no encontrada</p>}/>
    </Routes>
  )
}
