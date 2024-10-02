import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
