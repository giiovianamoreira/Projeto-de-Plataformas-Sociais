import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../services/api';

export const InstitutionCard = ({ institution }) => {
  // Estado para armazenar os dados detalhados da instituição
  const [institutionData, setInstitutionData] = useState(null);

  // Usado para buscar os dados detalhados da instituição quando o componente for montado ou quando 'institution.id' mudar
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        // Faz a requisição para obter os dados detalhados da instituição usando o ID da instituição
        const response = await api.get(`/institution/${institution.id}`);
        setInstitutionData(response.data);  // Armazena os dados recebidos no estado 'institutionData'
      } catch (error) {
        console.error('Erro ao buscar a instituição:', error);  // Caso haja erro na requisição, imprime o erro no console
      }
    };

    fetchInstitution();  // Chama a função para buscar os dados da instituição
  }, [institution.id]);  // O efeito depende de 'institution.id', sendo reexecutado quando ele mudar

  // Função para abrir uma nova aba com a página de informações detalhadas da instituição
  const handleOpenNewTab = () => {
    // Armazena o ID da instituição no localStorage para ser acessado em outra página
    localStorage.setItem('institutionId', institution.id);
    // Abre uma nova aba no navegador com a URL '/infoInstitution'
    window.open('/infoInstitution', '_blank');
  };

  // Recupera a primeira foto da instituição, se existir
  const photoUrl = institutionData && institutionData.foto && institutionData.foto.length > 0
    ? institutionData.foto[0].url  // Se houver fotos, usa a URL da primeira foto
    : 'https://via.placeholder.com/300x200';  // Caso contrário, usa uma imagem de placeholder

  return (
    <div className="card" style={{ width: '15rem' }}>
      {/* Exibe a imagem da instituição */}
      <img
        className="card-img-top"
        src={photoUrl}
        alt="Foto da Instituição"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Ajusta a imagem para cobrir a área da caixa sem distorção
      />
      <div className="card-body">
        {/* Exibe o nome da instituição */}
        <h5 className="card-title">{institution.nome}</h5>
        {/* Exibe o estado e cidade da instituição */}
        <p className="card-text">{institution.estado} - {institution.cidade}</p>
        {/* Exibe as áreas de atuação da instituição */}
        <p><strong>Áreas de Atuação:</strong> {institution.areasAtuacao}</p>
        {/* Botão que, ao ser clicado, abre uma nova aba com mais informações sobre a instituição */}
        <a href="#" className="btn btn-primary" onClick={handleOpenNewTab}>Saiba mais</a>
      </div>
    </div>
  );
};
