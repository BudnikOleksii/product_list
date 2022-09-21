import React from 'react';
import './App.scss';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import 'bulma';
import { ProductsList } from './Components/ProductsList';
import { ProductForm } from './Components/ProductForm';
import { NotFoundPage } from './Components/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/product/edit">
          <Route index element={<ProductForm />} />
          <Route path=":productId" element={<ProductForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};
