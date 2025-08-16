import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/register';
import Chat from '../pages/Chat/Chat';
import { useState } from 'react';

export default function AppRoutes() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}