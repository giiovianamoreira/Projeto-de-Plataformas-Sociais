import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api';
import { AuthContext } from './auth';

const InstitutionContext = createContext();

export const InstitutionProvider = ({ children }) => {
  const [institutions, setInstitutions] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchInstitutions = async () => {
    try {
      const response = await api.get('/institutions', {  
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
        },
      });
      setInstitutions(response.data.institutions);
    } catch (error) {
      console.error('Erro ao buscar instituições', error);
    }
  };

    const registerInstitution = async (institutionData) => {
      try {
        await api.post('/institution', institutionData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
          },
        });
    
        alert('Instituição cadastrada com sucesso!');
        fetchInstitutions(); 
      } catch (error) {
        console.error('Erro ao registrar instituição', error.response ? error.response.data : error);
        alert('Erro ao cadastrar instituição. Tente novamente.');
      }
    };
    
  

  const fetchAllInstitutions = async () => {
    try {
      const response = await api.get('/institution/listall');
      setInstitutions(response.data.institutions);
    } catch (error) {
      console.error('Erro ao buscar todas as instituições:', error);
    }
  };

  return (
    <InstitutionContext.Provider value={{ institutions, fetchInstitutions, registerInstitution, fetchAllInstitutions }}>
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitution = () => useContext(InstitutionContext);
