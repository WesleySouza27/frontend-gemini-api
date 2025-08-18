import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Form, Input, Button, LinkStyled } from './Login.styles';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/user/login', { username, password });
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
      }
      dispatch(setUser({ id: res.data.userId, username: res.data.username }));
      setSuccess('Login realizado com sucesso!');
      timeoutRef.current = window.setTimeout(() => {
        setSuccess('');
        navigate('/chat');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError('Erro ao fazer login');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit"> {loading ? 'Entrando...' : 'Entrar'}</Button>
        {success && <span style={{ color: 'green' }}>{success}</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <LinkStyled type="button" onClick={() => navigate('/register')}>
          Não tem conta? Cadastre-se
        </LinkStyled>
      </Form>
    </Container>
  );
};

export default Login;