// src/context/ChatContext.jsx
import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar mensagens por instituição
  const fetchMessages = async (institutionId) => {
    setLoading(true);
    try {
      const response = await api.get(`/messages/institution/${institutionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error); // Adicione este log para capturar erros
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (institutionId, content) => {
    try {
      const response = await api.post(`/messages`, { institutionId, content });
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};
