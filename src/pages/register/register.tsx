import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Form, Input, Button, LinkStyled } from './register.styles';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/user/register', { username, password });
      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch {
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
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
        <Button type="submit">Cadastrar</Button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <LinkStyled type="button" onClick={() => navigate('/')}>
          Já tem conta? Faça login
        </LinkStyled>
      </Form>
    </Container>
  );
};

export default Register;