import React, { Component } from 'react';
import Casa from './casa';
import Home from './Home';
import Vecino from './vecino';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuRutas from './MenuRutas';

export default class Router extends Component {
  render() {
    return (
      <div>
        <h1>Router</h1>
        <MenuRutas />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cine" element={<Casa />} />
            <Route path="/casa" element={<Vecino />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}