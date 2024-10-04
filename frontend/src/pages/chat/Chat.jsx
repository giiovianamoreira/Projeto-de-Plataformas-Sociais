import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para acessar o institutionId da URL
import { useChat } from '../../context/ChatContext';

export const Chat = () => {
  const { institutionId } = useParams(); // Pegue o institutionId da URL
  const { messages, fetchMessages, sendMessage, loading } = useChat();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages(institutionId); // Busque as mensagens da instituição
  }, [fetchMessages, institutionId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(institutionId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
        <p>teste</p>
      {loading ? (
        <p>Carregando mensagens...</p>
      ) : (
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user-message' : 'institution-message'}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      )}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};
