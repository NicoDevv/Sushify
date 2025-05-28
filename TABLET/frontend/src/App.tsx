import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TableSelectPage from './pages/TableSelectPage';
import MenuSelectPage from './pages/MenuSelectPage';
import MenuPage from './pages/MenuPage';
import DishPage from './pages/DishPage';
import EditPage from './pages/EditPage';
import { SushiProvider } from './context/SushiContext';

function App() {
  return (
    <SushiProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/table-select" element={<TableSelectPage />} />
        <Route path="/menu-select" element={<MenuSelectPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </SushiProvider>
  );
}

export default App;