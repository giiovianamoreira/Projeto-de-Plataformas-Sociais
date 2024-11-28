import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; // Para acessar o institutionId da URL
import { useChat } from '../../context/ChatContext'; // Para usar o contexto de chat

export const Chat = () => {
  // Obtém o institutionId da URL usando o hook useParams
  const { institutionId } = useParams(); 

  // Obtém as funções e o estado do contexto de chat (mensagens, loading, etc.)
  const { messages, fetchMessages, sendMessage, loading } = useChat();

  // Estado para armazenar o novo texto da mensagem que está sendo digitada
  const [newMessage, setNewMessage] = useState("");

  // useEffect para buscar as mensagens da instituição assim que o componente é montado
  useEffect(() => {
    fetchMessages(institutionId); // Chama a função fetchMessages para carregar as mensagens da instituição
  }, [fetchMessages, institutionId]); // Dependência: quando institutionId ou fetchMessages mudar, a função é chamada novamente

  // Função chamada ao clicar no botão "Enviar"
  const handleSendMessage = () => {
    if (newMessage.trim()) { // Verifica se a mensagem não está vazia
      sendMessage(institutionId, newMessage); // Envia a mensagem para a instituição
      setNewMessage(""); // Limpa o campo de texto após o envio
    }
  };

  return (
    <div className="chat-container">
        <p>teste</p>
      {loading ? (  // Se estiver carregando as mensagens, exibe "Carregando mensagens..."
        <p>Carregando mensagens...</p>
      ) : (
        <div className="messages">
          {/* Mapeia as mensagens e exibe cada uma */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user-message' : 'institution-message'}`}>
              {/* Se a mensagem for do usuário, aplica a classe 'user-message', caso contrário, 'institution-message' */}
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      )}
      {/* Seção para digitar e enviar uma nova mensagem */}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}  // O valor do input é o estado newMessage
          onChange={(e) => setNewMessage(e.target.value)}  // Atualiza o estado newMessage conforme o usuário digita
          placeholder="Digite sua mensagem..."  // Texto de ajuda no campo
        />
        <button onClick={handleSendMessage}>Enviar</button>  {/* Chama a função handleSendMessage ao clicar */}
      </div>
    </div>
  );
};
