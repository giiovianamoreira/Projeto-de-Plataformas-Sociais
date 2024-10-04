import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { InstitutionCard } from '../home/components/card';

export const UserInfoPage = () => {
  const [user, setUser] = useState(null);
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserAndInstitutions = async () => {
      try {
        const userResponse = await api.get(`/users/${userId}`);
        setUser(userResponse.data.user);

        const institutionsResponse = await api.get(`/institutions?userId=${userId}`);
        setInstitutions(institutionsResponse.data.institutions);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserAndInstitutions();
  }, []);

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div>
      <h1>Informações do Usuário</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h2>Instituições Cadastradas</h2>
      {institutions.length > 0 ? (
        <ul>
          {institutions.map((institution) => (
            <InstitutionCard key={institution.id} institution={institution}/>

          ))}
        </ul>
      ) : (
        <p>Nenhuma instituição cadastrada.</p>
      )}
    </div>
  );
};
