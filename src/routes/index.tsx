import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/register';
import Chat from '../pages/Chat/Chat';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function AppRoutes() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.id ? <Navigate to="/chat" /> : <Login onLogin={() => {}} />} />
        <Route path="/register" element={user.id ? <Navigate to="/chat" /> : <Register />} />
        <Route path="/chat" element={user.id ? <Chat/> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}