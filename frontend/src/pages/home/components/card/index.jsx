import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

export const InstitutionCard = ({ institution }) => {
  const handleOpenNewTab = () => {
    // Armazenar o ID da instituição no localStorage
    localStorage.setItem('institutionId', institution.id);

    // Abrir a nova aba
    window.open('/infoInstitution', '_blank');
  };

  return (
    <div className="card" style={{ width: '15rem' }}>
      <img className="card-img-top" src="./logo.png" alt="Card image cap" />
      {institution.id}

      <div className="card-body">
        <h5 className="card-title">{institution.nome}</h5>
        <p className="card-text">{institution.estado} - {institution.cidade}</p>
        <p><strong>Áreas de Atuação:</strong> {institution.areasAtuacao}</p>
        <a href="#" className="btn btn-primary" onClick={handleOpenNewTab}>Saiba mais</a>
      </div>
    </div>
  );
};
