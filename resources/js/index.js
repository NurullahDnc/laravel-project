import React, { Component } from 'react';
  import Main from './Routers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';


class Index extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Main />} />

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

createRoot(document.getElementById('index')).render(<Index />); 
