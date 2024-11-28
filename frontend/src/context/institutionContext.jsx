// Importação do React, hooks e contexto necessários
import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api'; // Importa a instância da API para realizar requisições
import { AuthContext } from './auth'; // Importa o contexto de autenticação para acessar os dados do usuário

// Criando o contexto para gerenciar as instituições
const InstitutionContext = createContext();

// Provedor de contexto que vai envolver a aplicação e fornecer os dados e funções relacionadas às instituições
export const InstitutionProvider = ({ children }) => {
  // Estado para armazenar as instituições obtidas da API
  const [institutions, setInstitutions] = useState([]);
  
  // Obtendo o usuário do contexto de autenticação
  const { user } = useContext(AuthContext);

  // Função para buscar todas as instituições da API
  const fetchInstitutions = async () => {
    try {
      // Faz a requisição GET para buscar as instituições com o token de autenticação no cabeçalho
      const response = await api.get('/institutions', {  
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`, // Adiciona o token no cabeçalho da requisição
        },
      });
      // Atualiza o estado com as instituições recebidas da API
      setInstitutions(response.data.institutions);
    } catch (error) {
      // Exibe erro no console caso a requisição falhe
      console.error('Erro ao buscar instituições', error);
    }
  };

  // Função para registrar uma nova instituição
  const registerInstitution = async (institutionData) => {
    try {
      // Envia uma requisição POST para cadastrar uma nova instituição
      await api.post('/institution', institutionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`, // Inclui o token de autenticação
        },
      });
    
      // Alerta o usuário sobre o sucesso do cadastro
      alert('Instituição cadastrada com sucesso!');
      
      // Chama a função para atualizar a lista de instituições
      fetchInstitutions(); 
    } catch (error) {
      // Exibe erro no console e alerta o usuário caso o cadastro falhe
      console.error('Erro ao registrar instituição', error.response ? error.response.data : error);
      alert('Erro ao cadastrar instituição. Tente novamente.');
    }
  };
  
  // Função para buscar todas as instituições (sem filtros específicos)
  const fetchAllInstitutions = async () => {
    try {
      // Faz a requisição GET para buscar todas as instituições
      const response = await api.get('/institution/listall');
      // Atualiza o estado com as instituições recebidas da API
      setInstitutions(response.data.institutions);
    } catch (error) {
      // Exibe erro no console caso a requisição falhe
      console.error('Erro ao buscar todas as instituições:', error);
    }
  };

  // O Provider fornece os valores do contexto para os componentes filhos
  return (
    <InstitutionContext.Provider value={{ institutions, fetchInstitutions, registerInstitution, fetchAllInstitutions }}>
      {children}  {/* Renderiza os componentes filhos dentro do provedor */}
    </InstitutionContext.Provider>
  );
};

// Hook customizado para acessar o contexto de instituições em qualquer parte da aplicação
export const useInstitution = () => useContext(InstitutionContext);
