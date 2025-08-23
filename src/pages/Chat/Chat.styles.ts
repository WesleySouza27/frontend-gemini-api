import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 240px;
  background: ${({ theme }) => theme.sidebar};
  padding: 2rem 1rem 3.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #282828;
  position: relative;
  height: 100vh;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.accent};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  @media (max-width: 700px) {
    margin: 0;
    font-size: 1.2rem;
  }
`;

export const UserGreeting = styled.div`
  color: ${({ theme }) => theme.messageBotText};
  font-size: 1rem;
  text-align: center;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const ThemeButton = styled.button`
  margin-top: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
  font-size: 1rem;
  align-self: center;
  @media (max-width: 700px) {
    margin-top: 0;
    font-size: 1.3rem;
  }
`;

export const LogoutButton = styled.button`
  position: absolute;
  left: 1.5rem;
  bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #ff6600;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
  svg {
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    position: static;
    font-size: 1.3rem;
    font-weight: 400;
    gap: 4px;
    padding: 0;
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

export const MessagesContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 40px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
`;

export const Message = styled.div<{ $isBot?: boolean }>`
  align-self: ${({ $isBot }) => ($isBot ? 'flex-start' : 'flex-end')};
  background: ${({ $isBot, theme }) => ($isBot ? theme.messageBot : theme.messageUser)};
  color: ${({ $isBot, theme }) => ($isBot ? theme.messageBotText : '#fff')};
  padding: 10px 10px 10px 10px;
  margin: 0 20px 50px 20px;
  border-radius: 18px;
  max-width: 70%;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  pre, code {
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
    background: ${({ theme }) => theme.inputBg};
  }
`;

export const InputContainer = styled.form`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 700px;
  display: flex;
  padding: 24px 0;
  background: transparent;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.inputText};
  outline: none;
  margin-right: 1rem;
  box-shadow: 0 1px 4px 0 rgba(255, 102, 0, 0.08);
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border: 2px solid #ff6600;
    box-shadow: 0 0 0 2px #ff660088;
  }
  &::placeholder {
    color: #bbb;
    opacity: 1;
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(255, 102, 0, 0.12);
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: linear-gradient(90deg, #ff8800 60%, #ff6600 100%);
    transform: translateY(-2px) scale(1.03);
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const BotLoading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ff6600;
  font-size: 1.1rem;
  align-self: flex-start;
  margin-left: 8px;

  &::before {
    content: '';
    width: 22px;
    height: 22px;
    border: 3px solid #ff6600;
    border-top: 3px solid transparent;
    border-radius: 50%;
    display: inline-block;
    animation: ${spin} 0.8s linear infinite;
  }
`;

export const MobileHeader = styled.header`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.sidebar};
    padding: 1rem 1.2rem;
    border-bottom: 1px solid #282828;
    position: sticky;
    top: 0;
    z-index: 10;
  }
`;