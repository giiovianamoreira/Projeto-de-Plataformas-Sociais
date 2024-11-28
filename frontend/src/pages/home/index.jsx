import React, { useEffect, useState } from 'react';
import { useInstitution } from '../../context/institutionContext'; // Importa o contexto de instituições
import { InstitutionCard } from './components/card'; // Componente responsável por exibir os cartões de instituições
import { Link } from 'react-router-dom'; // Usado para navegação entre páginas
import Navbar from './components/navebar'; // Barra de navegação personalizada
import '../home/index.css'; // Arquivo CSS para estilos

// Lista de estados brasileiros
const estadosBrasileiros = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
];

export const Home = () => {
  const { institutions = [], fetchAllInstitutions } = useInstitution(); // Hook do contexto que fornece as instituições e a função para buscá-las
  const [filteredInstitutions, setFilteredInstitutions] = useState([]); // Estado para armazenar as instituições filtradas
  const [selectedState, setSelectedState] = useState(""); // Estado para armazenar o estado selecionado no filtro
  const [verMais, setVerMais] = useState(false); // Estado para controle de exibição de mais instituições

  const numInstitutions = 10;

  // Carregar todas as instituições ao montar o componente
  useEffect(() => {
    fetchAllInstitutions(); // Busca todas as instituições verificadas do backend
  }, [fetchAllInstitutions]);

  // Atualiza a lista de instituições filtradas quando o estado ou a lista de instituições mudam
  useEffect(() => {
    const verifiedInstitutions = institutions.filter(inst => inst.verified); // Filtra apenas as instituições verificadas

    if (selectedState === "") {
      // Se nenhum estado for selecionado, mostra todas as instituições verificadas
      setFilteredInstitutions(verifiedInstitutions);
    } else {
      // Filtra as instituições verificadas de acordo com o estado selecionado
      setFilteredInstitutions(
        verifiedInstitutions.filter((inst) => inst.estado === selectedState)
      );
    }
  }, [institutions, selectedState]);

  // Função para lidar com a mudança de estado selecionado
  const handleStateChange = (e) => {
    setSelectedState(e.target.value); // Atualiza o estado selecionado
  };

  // Renderiza as instituições com base na condição de "Ver Mais"
  const renderInstitutions = () => {
    const institutionsToDisplay = verMais
      ? filteredInstitutions
      : filteredInstitutions.slice(0, numInstitutions);

    return institutionsToDisplay.map((inst) => (
      <InstitutionCard key={inst.id} institution={inst} />
    ));
  };

  return (
    <div>
      <div>
        {/* Link para a página de login */}
        <Link to="/login">Login</Link>

        <div className='header'>
        <img className="logo" src="logo.png"></img>
<div className='titulo'>
  <h1 >Plataforma de Projetos Sociais</h1>
</div>


{/* Botão para cadastrar como doador */}
<div className="button-group">
  <button
    className="register-button doador-button"
    onClick={() => (window.location.href = "login")}
  >
    Cadastrar como Doador
  </button>
</div>
        </div>

        {/* Filtro de estado */}
        <div>
          <label>Filtrar por Estado: </label>
          <select
            id="stateFilter"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Todos os Estados</option>
            {estadosBrasileiros.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        {/* Exibe as instituições filtradas */}
        <div className="institution-cards">
          {filteredInstitutions.length > 0 ? (
            renderInstitutions()
          ) : (
            <p>Nenhuma instituição encontrada para o estado selecionado.</p>
          )}
        </div>

        {/* Botão para "Ver Mais" ou "Ver Menos" */}
        <div className="button-group">
          <button onClick={() => setVerMais(!verMais)}>
            {verMais ? "Ver Menos" : "Ver Mais"}
          </button>
        </div>
      </div>
    </div>
  );
};
