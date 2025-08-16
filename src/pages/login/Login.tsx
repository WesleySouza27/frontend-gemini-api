import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Form, Input, Button, LinkStyled } from './Login.styles';

interface LoginProps {
  onLogin: (user: { id: number; username: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/user/login', { username, password });
      onLogin(res.data); // res.data deve conter id e username
    } catch {
      setError('Erro ao fazer login');
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
        <Button type="submit">Entrar</Button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <LinkStyled type="button" onClick={() => navigate('/register')}>
          Não tem conta? Cadastre-se
        </LinkStyled>
      </Form>
    </Container>
  );
};

export default Login;