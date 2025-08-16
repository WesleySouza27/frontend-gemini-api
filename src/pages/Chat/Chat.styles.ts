import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f3f4f6;
`;

export const ChatBox = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SendButton = styled.button`
  background: #2563eb;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    background: #1d4ed8;
  }
`;