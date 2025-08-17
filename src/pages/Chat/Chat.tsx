import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
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
  LogoutButton,
  Title,
  UserGreeting,
  ThemeButton,
  MobileHeader
} from './Chat.styles';
import { logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useThemeMode } from '../../styles/themeHook';
import { io, Socket } from 'socket.io-client';

interface MessageType {
  id?: string;
  content: string;
  isBot: boolean;
  createdAt?: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3030';

const Chat: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mode, toggle } = useThemeMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);

  // Carrega histórico inicial via REST
  useEffect(() => {
    if (user.id) {
      import('../../services/api').then(({ api }) => {
        api.get(`/message?userId=${user.id}`).then(res => setMessages(res.data));
      });
    }
  }, [user.id]);

  // Conecta ao socket e escuta mensagens
  useEffect(() => {
    if (!user.id) return;
    const token = localStorage.getItem('access_token');
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    // Ao receber mensagem do bot
    socket.on('receive_message', (msg: MessageType) => {
      setMessages(prev => [...prev, msg]);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [user.id]);

  // Scroll automático para o final das mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user.id || !socketRef.current) return;
    setLoading(true);

    // Adiciona mensagem do usuário localmente
    setMessages(prev => [
      ...prev,
      {
        content: input,
        isBot: false,
        createdAt: new Date().toISOString(),
      }
    ]);

    socketRef.current.emit('send_message', {
      content: input,
      userId: String(user.id),
    });

    setInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container>
      <MobileHeader>
        <Title>Chat Growdev</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeButton onClick={toggle} aria-label="Alternar tema">
            {mode === 'dark' ? '🌞' : '🌙'}
          </ThemeButton>
          <LogoutButton onClick={handleLogout} aria-label="Sair">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </LogoutButton>
        </div>
      </MobileHeader>
      <Sidebar>
        <Title>Chat Growdev</Title>
        <UserGreeting>
          Olá, {user.username}!
        </UserGreeting>
        <ThemeButton onClick={toggle}>
          {mode === 'dark' ? '🌞 Tema Claro' : '🌙 Tema Escuro'}
        </ThemeButton>
        <LogoutButton onClick={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Sair
        </LogoutButton>
      </Sidebar>
      <Main>
        <MessagesContainer>
          {messages.map((msg, idx) => (
            <Message key={msg.id || idx} isBot={msg.isBot}>
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