import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
`;

export const Form = styled.form`
  background: rgba(30, 30, 30, 0.95);
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(255, 102, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  color: #fff;
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    min-width: unset;
  }
`;

export const Input = styled.input`
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  background: #232323;
  color: #fff;
  outline: none;
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
  background: linear-gradient(90deg, #ff6600 60%, #ff8800 100%);
  color: #fff;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 6px;
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

export const LinkStyled = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
  &:hover {
    color: #4575faff;
  }
`;