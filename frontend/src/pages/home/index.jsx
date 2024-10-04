// src/pages/InstitutionList.jsx

import React, { useEffect, useState } from 'react';
import { useInstitution } from '../../context/institutionContext'; // Contexto de instituição
import { InstitutionCard } from './components/card'; // Componente para exibir a instituição
import { Link } from 'react-router-dom'; // Navegação

// Lista de estados brasileiros
const estadosBrasileiros = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
];

export const Home = () => {
  const { institutions, fetchAllInstitutions } = useInstitution(); // Hook do contexto
  const [filteredInstitutions, setFilteredInstitutions] = useState([]); // Lista filtrada
  const [selectedState, setSelectedState] = useState(""); // Estado selecionado

  // Carregar instituições ao montar o componente
  useEffect(() => {
    fetchAllInstitutions(); // Buscar todas as instituições
  }, [fetchAllInstitutions]);

  // Atualizar lista filtrada quando as instituições ou o estado selecionado mudarem
  useEffect(() => {
    const verifiedInstitutions = institutions.filter(inst => inst.verified); // Somente instituições verificadas
   
    

    if (selectedState === "") {
      // Mostrar todas as instituições verificadas se nenhum estado for selecionado
      setFilteredInstitutions(verifiedInstitutions);
    } else {
      // Filtrar por estado
      setFilteredInstitutions(
        verifiedInstitutions.filter((inst) => inst.estado === selectedState)
      );
    }
  }, [institutions, selectedState]);

  // Função para lidar com a mudança de estado selecionado
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div>
      <Link to="/login">Login</Link>
      <h1>Lista de Instituições</h1>

      <div>
        <label>Filtrar por Estado: </label>
        <select id="stateFilter" value={selectedState} onChange={handleStateChange}>
          <option value="">Todos os Estados</option>
          {estadosBrasileiros.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      <div className="institution-cards">
        {filteredInstitutions.length > 0 ? (
          // Exibir cada instituição verificada
          filteredInstitutions.map((inst) => (
            <InstitutionCard key={inst.id} institution={inst} />
          ))
        ) : (
          <p>Nenhuma instituição encontrada para o estado selecionado.</p>
        )}
      </div>
    </div>
  );
};
