import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import DishPage from './pages/DishPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-red-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;