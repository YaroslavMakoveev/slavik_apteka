import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import AuthCheck from './middleware/AuthCheck';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/catalog' element={
          <AuthCheck>
            <CatalogPage />
          </AuthCheck>
        }/>
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;