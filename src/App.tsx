import React from 'react';
import './App.scss';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import 'bulma';
import { ProductsList } from './Components/ProductsList';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/product/edit">
          <Route index element={<div>test</div>} />
          <Route path=":productId" element={<div>test</div>} />
        </Route>
        <Route path="*" element={<div>test</div>} />
      </Routes>
    </HashRouter>
  );
};
