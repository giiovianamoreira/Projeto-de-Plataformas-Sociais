import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Importa o CSS do Leaflet

const InstitutionMapModal = ({ institution }) => {
  const [isOpen, setIsOpen] = useState(false);  // Estado para controlar a visibilidade do modal

  const handleOpenModal = () => {
    setIsOpen(true);  // Abre o modal
  };

  const handleCloseModal = () => {
    setIsOpen(false);  // Fecha o modal
  };

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button onClick={handleOpenModal}>Ver Localização no Mapa</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Botão de fechamento do modal */}
            <span className="close" onClick={handleCloseModal}>&times;</span>

            {/* Mapa */}
            <MapContainer
              style={{ height: '400px', width: '100%' }}
              center={[institution.latitude, institution.longitude]} // Coordenadas da instituição
              zoom={15}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[institution.latitude, institution.longitude]}>
                {/* Popup exibindo o nome da instituição */}
                <Popup>{institution.nome}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionMapModal;
