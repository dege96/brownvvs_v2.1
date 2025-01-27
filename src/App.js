import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import './styles/themes.css';
import Home from './pages/Home';
import TjansterPage from './pages/TjansterPage';

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Laddar...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tjanster" element={<TjansterPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
