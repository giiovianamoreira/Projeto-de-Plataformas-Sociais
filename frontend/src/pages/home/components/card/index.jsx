import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../services/api';

export const InstitutionCard = ({ institution }) => {
  const [institutionData, setInstitutionData] = useState(null);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await api.get(`/institution/${institution.id}`);
        setInstitutionData(response.data);
      } catch (error) {
        console.error('Erro ao buscar a instituição:', error);
      }
    };

    fetchInstitution();
  }, [institution.id]);

  const handleOpenNewTab = () => {
    localStorage.setItem('institutionId', institution.id);
    window.open('/infoInstitution', '_blank');
  };

  // Recuperar a primeira foto, se existir
  const photoUrl = institutionData && institutionData.foto && institutionData.foto.length > 0
    ? institutionData.foto[0].url
    : 'https://via.placeholder.com/300x200'; // Usar placeholder se não houver fotos

  return (
    <div className="card" style={{ width: '15rem' }}>
      <img
        className="card-img-top"
        src={photoUrl}
        alt="Foto da Instituição"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Ajustar o tamanho da imagem
      />
      <div className="card-body">
        <h5 className="card-title">{institution.nome}</h5>
        <p className="card-text">{institution.estado} - {institution.cidade}</p>
        <p><strong>Áreas de Atuação:</strong> {institution.areasAtuacao}</p>
        <a href="#" className="btn btn-primary" onClick={handleOpenNewTab}>Saiba mais</a>
      </div>
    </div>
  );
};
