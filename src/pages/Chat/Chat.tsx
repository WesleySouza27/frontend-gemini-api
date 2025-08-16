import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container, ChatBox, MessageInput, SendButton } from './Chat.styles';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  createdAt: string;
}


const Chat: React.FC = () => {

  const user = useSelector((state: RootState) => state.user);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/message/userId=${user.id}`).then(res => setMessages(res.data));
  }, [user.id]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      // Envia exatamente o formato esperado pela API
      const res = await api.post('/message', {
        content: input,
        userId: String(user.id),
      });
      setMessages(prev => [...prev, res.data]);
      setInput('');
    } catch {
      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ChatBox>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.isBot ? 'left' : 'right' }}>
            <b>{msg.isBot ? 'Gemini' : user.username}:</b> {msg.content}
          </div>
        ))}
        {loading && <div>Carregando resposta da IA...</div>}
      </ChatBox>
      <form onSubmit={sendMessage}>
        <MessageInput
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua mensagem"
          disabled={loading}
        />
        <SendButton type="submit" disabled={loading}>Enviar</SendButton>
      </form>
    </Container>
  );
};

export default Chat;