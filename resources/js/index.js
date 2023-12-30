import React, { Component } from 'react';
  import Main from './Routers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {Provider} from 'mobx-react';
import Store from './Store';

//form sayfalarını router.js icerisinde imp etik buraya main adında 
class Index extends Component {
  render() {
    return (
      <div>
        {/*store icerisindeki tum degerleri aktar */}
        <Provider {...Store}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Main />} />

            </Routes>
          </BrowserRouter>
        </Provider>
        
      </div>
    );
  }
}

createRoot(document.getElementById('index')).render(<Index />); 
