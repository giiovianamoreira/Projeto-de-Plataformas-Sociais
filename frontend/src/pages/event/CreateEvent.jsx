import React, { useState } from 'react';
import axios from 'axios';

export const CreateEvent = () => {
  // Definindo os estados para os campos do formulário
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const institutionId = localStorage.getItem('institutionId');
      const eventData = {
        local,
        data,
        hora,
        categoria,
        descricao,
        finalidade,
        institutionId,
      };

      // Fazendo a requisição para o back-end
      await axios.post('http://localhost:3333/events', eventData);
      alert('Evento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o evento:', error);
      alert('Erro ao criar o evento.');
    }
  };

  return (
    <div>
      <h1>Criar Evento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Local:</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Finalidade:</label>
          <input
            type="text"
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};
