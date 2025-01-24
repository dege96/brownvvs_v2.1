import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import './styles/themes.css';
import Home from './pages/Home';
import TjansterPage from './pages/TjansterPage';
import CoursesPage from './pages/CoursesPage';

const HomeLazy = React.lazy(() => import('./pages/Home'));
const TjansterPageLazy = React.lazy(() => import('./pages/TjansterPage'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Laddar...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tjanster" element={<TjansterPage />} />
          <Route path="/kurser" element={<CoursesPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
