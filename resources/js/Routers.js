import React from 'react';
import { Routes, Route } from 'react-router-dom';

/*sayfalar */
import FrontIndex from './views/Index';
import FrontLogin from './views/Login';
import FrontRegister from './views/Register';

// Router Giriş çıkış sayfaları, bu sayfayı da ındex.js import ettim
export default function Router() {
    return (
        <Routes>
            <Route exact path='/' element={<FrontIndex />} />
            <Route path='/Login' element={<FrontLogin />} />
            <Route path='/Register' element={<FrontRegister />} />
        </Routes>
    );
}
