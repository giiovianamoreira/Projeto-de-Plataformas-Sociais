import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa os componentes do Leaflet
import 'leaflet/dist/leaflet.css'; // Estilos do Leaflet
import L from 'leaflet'; // Importa Leaflet para manipulação de ícones

// Necessário para corrigir o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const InfoInstitution = () => {
  const [institution, setInstitution] = useState(null);
  const [events, setEvents] = useState([]);
  const institutionId = localStorage.getItem('institutionId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await api.get(`/institution/${institutionId}`);
        setInstitution(response.data);
        // Você pode também buscar eventos da instituição aqui, se necessário
      } catch (error) {
        console.error('Erro ao buscar a instituição:', error);
      }
    };
    fetchInstitution();
  }, [institutionId]);

  if (!institution) {
    return <p>Carregando informações da instituição...</p>;
  }

  const handleOpenUserPage = () => {
    localStorage.setItem('userId', institution.userId);
    window.open('/userInfo', '_blank');
  };

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <h1>{institution.nome}</h1>
      <h4>{institution.cnpj}</h4>
      <h4>{institution.endereco}</h4>

      <button onClick={handleOpenUserPage}>Ver informações do usuário</button>

      {/* Exibir fotos da instituição com o carrossel */}
      <h2>Fotos da Instituição</h2>
      {institution.foto.length > 0 ? (
        <Slider {...settings}>
          {institution.foto.map((foto, index) => (
            <div key={index}>
              <img
                src={foto.url}
                alt={`Foto ${index + 1}`}
                style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '10px' }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Nenhuma foto disponível.</p>
      )}

      {/* Listar eventos da instituição */}
      <h2>Eventos</h2>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <p><strong>Local:</strong> {event.local}</p>
              <p><strong>Data:</strong> {new Date(event.data).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {event.hora}</p>
              <p><strong>Categoria:</strong> {event.categoria}</p>
              <p><strong>Descrição:</strong> {event.descricao}</p>
              <p><strong>Finalidade:</strong> {event.finalidade}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}


      <h2>Localização</h2>
      <MapContainer center={[institution.latitude, institution.longitude]} zoom={15} style={{ height: '400px', width: '50%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[institution.latitude, institution.longitude]}>
          <Popup>
            {institution.nome} <br /> {institution.endereco}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
