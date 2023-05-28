import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisPage from './pages/RegisPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import CreateArticle from './pages/CreateArticle';
import Article from './pages/Article';
import { useState } from 'react';
import LoginContext from './context/LoginContext';
import EditArticle from './pages/EditArticle';
import Header from './components/Header';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken")!==undefined&&localStorage.getItem("accessToken")!==null?localStorage.getItem("accessToken"):"");
  return (
    <LoginContext.Provider value={{ accessToken, setAccessToken }}>
      <Header accessToken={accessToken} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisPage />} />
        <Route path='/profile/:user' element={<ProfilePage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/new-article' element={<CreateArticle />} />
        <Route path='/article/:slug' element={<Article />} />
        <Route path='/articles/:slug' element={<EditArticle />} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
