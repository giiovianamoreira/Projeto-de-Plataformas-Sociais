import React, { useState, useEffect } from 'react'; // Importação do React e hooks useState e useEffect
import { api } from '../../services/api'; // Importação da instância API configurada para fazer requisições
import { InstitutionCard } from '../home/components/card'; // Importação do componente InstitutionCard, que será utilizado para exibir as instituições


export const UserInfoPage = () => {
  // Definindo os estados para armazenar informações do usuário e das instituições
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário (inicialmente nulo)
  const [institutions, setInstitutions] = useState([]); // Estado para armazenar a lista de instituições (inicialmente vazio)


  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário armazenado no localStorage

    // Função assíncrona para buscar informações do usuário e suas instituições
    const fetchUserAndInstitutions = async () => {
      try {
        // Requisição para obter os dados do usuário
        const userResponse = await api.get(`/users/${userId}`);
        setUser(userResponse.data.user); // Armazena as informações do usuário no estado 'user'

        // Requisição para obter as instituições relacionadas ao usuário
        const institutionsResponse = await api.get(`/institutions?userId=${userId}`);
        setInstitutions(institutionsResponse.data.institutions); // Armazena as instituições no estado 'institutions'
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error); // Caso ocorra erro nas requisições
      }
    };

    fetchUserAndInstitutions(); // Chama a função para buscar os dados
  }, []); // O array vazio indica que o useEffect será executado uma única vez, após o componente ser montado

  if (!user) {
    return <p>Carregando informações do usuário...</p>; // Exibe uma mensagem enquanto as informações do usuário estão sendo carregadas
  }


  return (
    <div>
      <h1>Informações do Usuário</h1>
      <p><strong>Nome:</strong> {user.name}</p> {/* Exibe o nome do usuário */}
      <p><strong>Email:</strong> {user.email}</p> {/* Exibe o email do usuário */}

      <h2>Instituições Cadastradas</h2>
      {institutions.length > 0 ? (
        <ul> {/* Exibe as instituições cadastradas se houverem */}
          {institutions.map((institution) => (
            <InstitutionCard key={institution.id} institution={institution}/> // Utiliza o componente InstitutionCard para cada instituição
          ))}
        </ul>
      ) : (
        <p>Nenhuma instituição cadastrada.</p> // Mensagem caso não existam instituições cadastradas
      )}
    </div>
  );
};
