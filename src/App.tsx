import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { RequestForm } from './components/RequestForm';
import { Status } from './pages/Status';
import { Admin } from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/od" element={<RequestForm type="OD" />} />
            <Route path="/leave" element={<RequestForm type="LEAVE" />} />
            <Route path="/status" element={<Status />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
