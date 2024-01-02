import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './Routers';
import { BrowserRouter, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {Provider} from 'mobx-react';
import Store from './Store';

//form sayfalarını router.js icerisinde imp etik buraya main adında 
class Index extends Component 
{
    render(){
        return (
       /*store icerisindeki tum degerleri aktar */
        <Provider {...Store}>
            <BrowserRouter>
                <Route component={Main} />
            </BrowserRouter>
        </Provider>
        )
    }
}



createRoot(document.getElementById('index')).render(<Index />); 
