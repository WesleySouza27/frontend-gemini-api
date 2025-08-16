import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { api } from '../../services/api';
import {
  Container,
  Sidebar,
  Main,
  MessagesContainer,
  Message,
  InputContainer,
  Input,
  Button,
  BotLoading,
  LogoutButton
} from './Chat.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface MessageType {
  id: string;
  content: string;
  isBot: boolean;
  createdAt: string;
}

const Chat: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      api.get(`/message?userId=${user.id}`).then(res => setMessages(res.data));
    }
  }, [user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user.id) return;
    setLoading(true);
    try {
      const res = await api.post('/message', {
        content: input,
        userId: String(user.id),
      });
      setMessages(prev => [
        ...prev,
        res.data.userMessage,
        res.data.botMessage,
      ]);
      setInput('');
    } catch {
      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container>
      <Sidebar>
        <h2 style={{
          color: '#ff6600',
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: 700,
          letterSpacing: '1px'
        }}>
          Chat Gemini
        </h2>
        <div style={{ color: '#fff', fontSize: '1rem', textAlign: 'center' }}>
          Olá, {user.username}!
        </div>
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          Sair
        </LogoutButton>
      </Sidebar>
      <Main>
        <MessagesContainer>
          {messages.map((msg) => (
            <Message key={msg.id} isBot={msg.isBot}>
              {msg.isBot
                ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                : msg.content}
            </Message>
          ))}
          {loading && (
            <BotLoading>
              Gemini está respondendo...
            </BotLoading>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer onSubmit={sendMessage}>
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </InputContainer>
      </Main>
    </Container>
  );
};

export default Chat;