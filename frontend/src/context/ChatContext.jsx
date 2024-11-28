// Importando os hooks e funções necessários do React e a instância da API
import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

// Criando o contexto de chat, que vai permitir o compartilhamento de dados de mensagens entre os componentes
const ChatContext = createContext();

// Hook customizado para facilitar o acesso ao ChatContext em outros componentes
export const useChat = () => useContext(ChatContext);

// Componente provedor que envolve a aplicação e fornece o estado do chat para seus filhos
export const ChatContextProvider = ({ children }) => {
  // Estado para armazenar as mensagens recebidas
  const [messages, setMessages] = useState([]);
  
  // Estado para controlar o status de carregamento (se as mensagens estão sendo carregadas)
  const [loading, setLoading] = useState(false);

  // Função para buscar as mensagens de uma instituição específica a partir de seu ID
  const fetchMessages = async (institutionId) => {
    setLoading(true); // Define o estado de loading como true antes de fazer a requisição
    try {
      // Faz a requisição GET para buscar as mensagens dessa instituição
      const response = await api.get(`/messages/institution/${institutionId}`);
      setMessages(response.data); // Atualiza o estado com as mensagens recebidas
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error); // Exibe um erro no console caso a requisição falhe
    } finally {
      setLoading(false); // Define o estado de loading como false, independentemente do sucesso ou falha da requisição
    }
  };

  // Função para enviar uma nova mensagem para a instituição
  const sendMessage = async (institutionId, content) => {
    try {
      // Envia a mensagem via POST para a API
      const response = await api.post(`/messages`, { institutionId, content });
      setMessages((prev) => [...prev, response.data]); // Atualiza o estado com a nova mensagem enviada
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error); // Exibe um erro no console caso a requisição falhe
    }
  };

  return (
    // O ChatContext.Provider fornece os dados e funções do contexto para os componentes filhos
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage, loading }}>
      {children}  {/* Renderiza os componentes filhos dentro do provedor */}
    </ChatContext.Provider>
  );
};
