import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import { api } from '../../services/api';

export const InfoInstitution = () => {
  const [institution, setInstitution] = useState(null);
  const [events, setEvents] = useState([]); // Estado para armazenar os eventos
  const institutionId = localStorage.getItem('institutionId'); 
  const navigate = useNavigate(); // Inicialize o useNavigate

  // Buscar dados da instituição
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await api.get(`/institution/${institutionId}`);
        setInstitution(response.data);
      } catch (error) {
        console.error('Erro ao buscar a instituição:', error);
      }
    };

    fetchInstitution();
  }, [institutionId]);

  // Buscar eventos da instituição
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/institutions/${institutionId}/events`);
        setEvents(response.data); // Armazena os eventos no estado
      } catch (error) {
        console.error('Erro ao buscar os eventos da instituição:', error);
      }
    };

    fetchEvents();
  }, [institutionId]);

  if (!institution) {
    return <p>Carregando informações da instituição...</p>;
  }

  const handleOpenUserPage = () => {
    localStorage.setItem('userId', institution.userId);
    window.open('/userInfo', '_blank');
  };

  return (
    <div>
      <h1>{institution.nome}</h1>
      <p><strong>CNPJ:</strong> {institution.cnpj}</p>
      <p><strong>Endereço:</strong> {institution.endereco}, {institution.rua}, {institution.numero}, {institution.complemento}, {institution.bairro}, {institution.cidade}, {institution.estado}, {institution.cep}</p>
      <p><strong>Telefone:</strong> {institution.telefone}</p>
      <p><strong>E-mail:</strong> {institution.email}</p>
      <p><strong>Website:</strong> {institution.website}</p>
      <p><strong>Facebook:</strong> {institution.facebook}</p>
      <p><strong>Instagram:</strong> {institution.instagram}</p>
      <p><strong>LinkedIn:</strong> {institution.linkedin}</p>
      <p><strong>Descrição:</strong> {institution.descricao}</p>
      <p><strong>Nome do Responsável:</strong> {institution.nomeResponsavel}</p>

      <button onClick={handleOpenUserPage}>Ver informações do usuário</button>

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
    </div>
  );
};
