import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './page/login';
import Register from './page/register';
import Dashboard from './page/Dashboard';
import Profil from './page/profil';
import Dashadmin from './page/dashadmin';
import Forgot from './page/forgot-password';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/dashadmin" element={<Dashadmin />} />
        <Route path="/forgot-password" element={<Forgot />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
