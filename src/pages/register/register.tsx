import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Form, Input, Button, LinkStyled } from '../login/Login.styles';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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
      if (!username || !password) {
        setError('Por favor, preencha todos os campos');
        setLoading(false);
        return;
      }

      const response = await api.get(`/user/${username}`);
      if (response.data.username === username) {
        setError('Nome de usuário já existe');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        setLoading(false);
        return;
      }

      await api.post('/user/register', { username, password });
      setSuccess('Usuário cadastrado com sucesso!');
      timeoutRef.current = window.setTimeout(() => {
        setSuccess('');
        navigate('/'); 
      }, 2000);
    } catch {
      setLoading(false);
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
        <Button type="submit"> {loading ? 'Cadastrando...' : 'Cadastrar'}</Button>
        {success && <span style={{ color: 'green' }}>{success}</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <LinkStyled type="button" onClick={() => navigate('/')}>
          Já tem conta? Faça login
        </LinkStyled>
      </Form>
    </Container>
  );
};

export default Register;