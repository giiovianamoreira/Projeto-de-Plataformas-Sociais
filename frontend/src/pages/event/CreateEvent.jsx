import React, { useState } from 'react';
import axios from 'axios';

export const CreateEvent = () => {
  // Definindo os estados para os campos do formulário
  const [local, setLocal] = useState('');  // Estado para armazenar o local do evento
  const [data, setData] = useState('');    // Estado para armazenar a data do evento
  const [hora, setHora] = useState('');    // Estado para armazenar a hora do evento
  const [categoria, setCategoria] = useState(''); // Estado para armazenar a categoria do evento
  const [descricao, setDescricao] = useState('');  // Estado para armazenar a descrição do evento
  const [finalidade, setFinalidade] = useState(''); // Estado para armazenar a finalidade do evento

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    try {
      // Obtém o ID da instituição do localStorage
      const institutionId = localStorage.getItem('institutionId');

      // Prepara os dados do evento para envio
      const eventData = {
        local,
        data,
        hora,
        categoria,
        descricao,
        finalidade,
        institutionId,  // ID da instituição é adicionado aos dados
      };

      // Faz a requisição POST para criar o evento no back-end
      await axios.post('http://localhost:3333/events', eventData);
      
      // Exibe uma mensagem de sucesso
      alert('Evento criado com sucesso!');
    } catch (error) {
      // Caso haja erro na criação do evento, exibe mensagem de erro
      console.error('Erro ao criar o evento:', error);
      alert('Erro ao criar o evento.');
    }
  };

  return (
    <div>
      <h1>Criar Evento</h1>
      {/* Formulário para criação do evento */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Local:</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}  // Atualiza o estado 'local' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}  // Atualiza o estado 'data' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}  // Atualiza o estado 'hora' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}  // Atualiza o estado 'categoria' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}  // Atualiza o estado 'descricao' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        <div>
          <label>Finalidade:</label>
          <input
            type="text"
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}  // Atualiza o estado 'finalidade' com o valor do campo
            required  // O campo é obrigatório
          />
        </div>
        {/* Botão de envio do formulário */}
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};
